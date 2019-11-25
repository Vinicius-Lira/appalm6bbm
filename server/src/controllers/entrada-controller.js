'use strict';
const Helpers = require("./../../helpers/helpers");
const Entrada = require('./../models/Entrada');
const ItensEntrada = require('./../models/ItensEntrada');
const Pessoa = require('./../models/Pessoa');
const Lote = require('./../models/Lote');
const ProdutosLote = require('./../models/ProdutosLote');
const Contrato = require('./../models/Contrato');

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
                entradas.forEach(element => {
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
                });
                res.status(200).json(entradas);
            });
        });
        
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
    
    console.log(data);
    Lote.findAll().then(response => {
        var lotes = JSON.parse(JSON.stringify(response));
        ProdutosLote.findAll().then(response => {
            var produtosLote = JSON.parse(JSON.stringify(response));

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
                            var itensInseridos = response;
                            if(itensInseridos) {
                                itensInseridos.forEach(item => {
                                    for(var i = 0; i < produtosLote.length; i++) {
                                        if(item.idLote == produtosLote[i].idLote && item.idProduto == produtosLote[i].idProduto) {
                                            produtosLote[i].qtdRecebida = produtosLote[i].qtdRecebida + parseFloat(item.qtdEntrada);
                                            produtosLote[i].qtdRestante = produtosLote[i].qtdContratada - produtosLote[i].qtdRecebida;
                                            console.log(produtosLote[i].valorUnitario);
                                            ProdutosLote.update(produtosLote[i], {
                                                where: {
                                                    id: produtosLote[i].id
                                                }
                                            }).then(response => {
                                                console.log(response);
                                                
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
    
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var dataEntrada = req.body.dataEntrada;
    var observacoes = req.body.observacoes;
    var data = {
        dataEntrada: dataEntrada,
        observacoes: observacoes,
        createdAt: Helpers.getDataHoraAtual()
    };

    Entrada.update(data, {
        where: {
            id: id
        }
    }).then(response => {
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
