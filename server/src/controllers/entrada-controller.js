'use strict';
const Helpers = require("./../../helpers/helpers");
const Entrada = require('./../models/Entrada');
const ItensEntrada = require('./../models/ItensEntrada');
const Pessoa = require('./../models/Pessoa');
const Lote = require('./../models/Lote');
const ProdutosLote = require('./../models/ProdutosLote');
const Contrato = require('./../models/Contrato');
const Produto = require('./../models/Produto');
const PropriedadesProduto = require('./../models/PropriedadesProduto');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Entrada.findAll().then(response => {
        var find = [];
        var data = JSON.parse(JSON.stringify(response));
        for(var i = 0; i < data.length; i++){
            if(data[i].id == id) {
                find = data[i] ;
                break;
            }
        }

        res.status(200).json(find);
    });

}

exports.getAll = (req, res, next) => {
    Entrada.findAll().then(response => {
        var entradas = JSON.parse(JSON.stringify(response));
        Contrato.findAll().then(response => {
            var contratos = JSON.parse(JSON.stringify(response));
            Pessoa.findAll().then(response => {
                var pessoas = JSON.parse(JSON.stringify(response));

                ItensEntrada.findAll().then(response => {
                    var itensEntrada = JSON.parse(JSON.stringify(response));
                    entradas.forEach(element => {
                        element.itensEntrada = [];
                        element.dataEntrada = Helpers.formatDate(element.dataEntrada);
                        for(var i = 0; i < contratos.length; i++) {
                            if(contratos[i].id == element.idContrato) {
                                element.contrato = contratos[i].numeroContrato;
                                break;
                            }
                        }
    
                        for(var k = 0; k < pessoas.length; k++) {
                            if(pessoas[k].id == element.idPessoa) {
                                element.pessoa = pessoas[k].nome;
                                break;
                            }
                        }

                        for(var y = 0; y < itensEntrada.length; y++) {
                            if(itensEntrada[y].idEntrada == element.id) {
                                element.itensEntrada.push(itensEntrada[y]);
                            }
                        }
                    });
                    res.status(200).json(entradas);
                });
            });
        });
    });
}

exports.getItensEntrada = (req, res, next) => {
    var idEntrada = req.params.idEntrada;

    ItensEntrada.findAll().then(response => {
        var itensEntrada = JSON.parse(JSON.stringify(response));
        var itens = [];

        itensEntrada.forEach(element => {
            if(element.idEntrada == idEntrada) {
                itens.push(element);
            }
        });
        
        res.status(200).json(itens);
    });
}

exports.post = (req, res, next) => {
    var dataEntrada = req.body.dataEntrada;
    var observacoes = req.body.observacoes;
    var idContrato = req.body.idContrato;
    var itensEntrada = req.body.itensEntrada;
    var usuario = req.body.usuario;

    var dataEntradaDia = (parseInt(dataEntrada.split('/')[0]) + 1).toString();
    var dataEntradaMes = dataEntrada.split('/')[1];
    var dataEntradaAno = dataEntrada.split('/')[2];

    var data = {
        dataEntrada: dataEntradaAno + "-" + dataEntradaMes + "-" + dataEntradaDia + " 00:00:00",
        observacoes: observacoes,
        idContrato: idContrato,
        idPessoa: null,
        createdAt: Helpers.getDataHoraAtual()
    };
    Produto.findAll().then(response => {
        var produtos = JSON.parse(JSON.stringify(response));
        Lote.findAll().then(response => {
            var lotes = JSON.parse(JSON.stringify(response));
            ProdutosLote.findAll().then(response => {
                var produtosLote = JSON.parse(JSON.stringify(response));
                PropriedadesProduto.findAll().then(response => {
                    var propriedadesProduto = JSON.parse(JSON.stringify(response));
                    Pessoa.findAll().then(response => {
                        const pessoas = JSON.parse(JSON.stringify(response));
                        for(var i = 0; i < pessoas.length; i++) {
                            if(pessoas[i].usuario.localeCompare(usuario) == 0) {
                                data.idPessoa = pessoas[i].id;
                                break;
                            }
                        }
                        Entrada.create(data).then(response => {
                            var entrada = JSON.parse(JSON.stringify(response));
                            if(entrada.id){
                                itensEntrada.forEach(element => {
                                    element.idContrato = idContrato;
                                    element.idEntrada = entrada.id;
                    
                                    for(var i = 0; i < produtosLote.length; i++) {
                                        if(element.idProduto == produtosLote[i].idProduto) {
                                            for(var k = 0; k < lotes.length; k++) {
                                                if(produtosLote[i].idLote == lotes[k].id && lotes[k].situacao == true && lotes[k].idContrato == idContrato) {
                                                    element.idLote = lotes[k].id;
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                });
                                ItensEntrada.bulkCreate(itensEntrada).then(response => {
                                    var itensInseridos = JSON.parse(JSON.stringify(response));
                                    if(itensInseridos) {
                                        itensInseridos.forEach(item => {
                                            produtos.forEach(produto => {
                                                if(item.idProduto == produto.id) {
                                                    produto.qtdEstoque = parseFloat(produto.qtdEstoque) + parseFloat(item.qtdEntrada);
                                                    Produto.update(produto, {
                                                        where: {
                                                            id: produto.id
                                                        }
                                                    });
                                                }
                                            });

                                            propriedadesProduto.forEach(propriedade => {
                                                if(propriedade.idProduto == item.idProduto && propriedade.id == item.idPropriedadeProduto) {
                                                    propriedade.qtdEstoque = parseFloat(propriedade.qtdEstoque) + parseFloat(item.qtdEntrada);
                                                    PropriedadesProduto.update(propriedade, {
                                                        where: {
                                                            id: propriedade.id
                                                        }
                                                    });
                                                }
                                            });

                                            for(var i = 0; i < produtosLote.length; i++) {
                                                if(item.idLote == produtosLote[i].idLote && item.idProduto == produtosLote[i].idProduto && item.idPropriedadeProduto == produtosLote[i].idPropriedadeProduto) {    
                                                    produtosLote[i].qtdRecebida = produtosLote[i].qtdRecebida + parseFloat(item.qtdEntrada);
                                                    produtosLote[i].qtdRestante = produtosLote[i].qtdContratada - produtosLote[i].qtdRecebida;
                                                    ProdutosLote.update(produtosLote[i], {
                                                        where: {
                                                            id: produtosLote[i].id
                                                        }
                                                    });
                                                    
                                                    for(var k = 0; k < lotes.length; k++) {
                                                        if(item.idLote == lotes[k].id) {
                                                            lotes[k].valorConsumido = lotes[k].valorConsumido + (item.qtdEntrada * parseFloat(produtosLote[i].valorUnitario));
                                                            Lote.update(lotes[k], {
                                                                where: {
                                                                    id: lotes[k].id
                                                                }
                                                            });
                                                        }
                                                    }
        
                                                }
                                            }
                                        });
                                        res.status(200).json(itensInseridos);
                                    }
                                });
                            }
                        });
                    });
                });


                
            });
        });
    });
   
    
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var dataEntrada = req.body.dataEntrada;
    var observacoes = req.body.observacoes;
    var idContrato = req.body.idContrato;
    var itensEntrada = req.body.itensEntrada;

    var dataEntradaDia = (parseInt(dataEntrada.split('/')[0]) + 1).toString();
    var dataEntradaMes = dataEntrada.split('/')[1];
    var dataEntradaAno = dataEntrada.split('/')[2];

    var data = {
        dataEntrada: dataEntradaAno + "-" + dataEntradaMes + "-" + dataEntradaDia + " 00:00:00",
        observacoes: observacoes,
        idContrato: idContrato,
        createdAt: Helpers.getDataHoraAtual()
    };

    Entrada.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        Lote.findAll().then(response => {
            var lotes = JSON.parse(JSON.stringify(response));
            ProdutosLote.findAll().then(response => {
                var produtosLote = JSON.parse(JSON.stringify(response));
                ItensEntrada.findAll().then(response => {
                    var itensEntradaAntesUpdate = JSON.parse(JSON.stringify(response));
                    ProdutosLote.findAll().then(response => {
                        var produtosLote = JSON.parse(JSON.stringify(response));
                        itensEntrada.forEach(itemModificado => {
                            itensEntradaAntesUpdate.forEach(itemOriginal => {
                                if(itemOriginal.id == itemModificado.id) {
                                    produtosLote.forEach(item => {
                                        if(itemModificado.id == itemOriginal.id) {
                                            if(itemModificado.qtdEntrada != item.qtdEntrada) {
                                                if(itemModificado.idLote == item.idLote && itemModificado.idProduto == item.idProduto && itemModificado.idPropriedadeProduto == item.idPropriedadeProduto) {
                                                    var qtdRecebidaAnterior =  item.qtdRecebida;
                                                    item.qtdRecebida = item.qtdRecebida - itemOriginal.qtdEntrada;
                                                    item.qtdRecebida = item.qtdRecebida + itemModificado.qtdEntrada;
    
                                                    item.qtdRestante = item.qtdRestante + qtdRecebidaAnterior;
                                                    item.qtdRestante = item.qtdContratada - item.qtdRecebida;
                                                                                                
                                                    ProdutosLote.update(item, {
                                                        where: {
                                                            id: item.id
                                                        }
                                                    }).then(response =>{
                                                        if(response){
                                                            ItensEntrada.update(itemModificado, {
                                                                where: {
                                                                    id: itemModificado.id
                                                                }
                                                            }).then(response => {
                                                                lotes.forEach(lote => {
                                                                    if(item.idLote == lote.id) {
                                                                        lote.valorConsumido = lote.valorConsumido - (itemOriginal.qtdEntrada * item.valorUnitario);
                                                                        console.log("\n Val. Original: " + lote.valorConsumido + "\n\n");
                                                                        lote.valorConsumido = lote.valorConsumido + (itemModificado.qtdEntrada * item.valorUnitario);
                                                                        console.log("\n val. novo: " + lote.valorConsumido + "\n\n");

                                                                        Lote.update(lote, {
                                                                            where: {
                                                                                id: lote.id
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Entrada.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
