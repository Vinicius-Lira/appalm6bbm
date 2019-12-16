'use strict';
const Helpers = require("./../../helpers/helpers");
const Saida = require('./../models/Saida');
const Pessoa = require('./../models/Pessoa');
const ItemSaida = require('./../models/ItemSaida');
const Produto = require('./../models/Produto');
const PropriedadesProduto = require('./../models/PropriedadesProduto');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Saida.findAll().then(response => {
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
    Saida.findAll().then(response => {
        var saidas = JSON.parse(JSON.stringify(response));
        Pessoa.findAll().then(response => {
            var pessoas = JSON.parse(JSON.stringify(response));

            saidas.forEach(saida => {
                for(var i = 0; i < pessoas.length; i++) {
                    if(pessoas[i].id == saida.idSolicitante) {
                        saida.solicitante = pessoas[i].nome;
                    }

                    if(pessoas[i].id == saida.idResponsavelEntrega) {
                        saida.responsavelEntrega = pessoas[i].nome;
                    }
                }

                saida.dataSaida = saida.dataSaida.split("T")[0].split("-").reverse().join("/");
            });

            res.status(200).json(saidas);
        });
        
    });
}

exports.post = (req, res, next) => {
    var dataSaida = req.body.dataSaida;
    var observacoes = req.body.observacoes;
    var idSolicitante = req.body.idSolicitante;
    var usuario = req.body.usuario;
    var itens = req.body.itens;

    Pessoa.findAll().then(response => {
        var pessoas = JSON.parse(JSON.stringify(response));
        var idResponsavelEntrega = null;
        pessoas.forEach(pessoa => {
            if(pessoa.usuario.localeCompare(usuario) == 0) {
                idResponsavelEntrega = pessoa.id;
            }
        });

        var data = {
            dataSaida: dataSaida.split('/').reverse().join("-") + " 00:00:00",
            observacoes: observacoes,
            idSolicitante: idSolicitante,
            idResponsavelEntrega: idResponsavelEntrega,
            createdAt: Helpers.getDataHoraAtual()
        };

        Saida.create(data).then(response => {
            if(response) {
                itens.forEach(item => {
                    item.idSaida = response.id;
                    item.qtdSaida = item.qtdSaida.replace(',', '.');
                });
                ItemSaida.bulkCreate(itens).then(response => {
                    if(response) {
                        PropriedadesProduto.findAll().then(response => {
                            var propriedadesProduto = JSON.parse(JSON.stringify(response));
                            Produto.findAll().then(response => {
                                var produtos = JSON.parse(JSON.stringify(response));
    
                                for(var i = 0; i < itens.length; i++) {
                                    var item = itens[i];
                                    produtos.forEach(produto => {
                                        if(produto.id == itens[i].idProduto) {
                                            produto.qtdEstoque = parseFloat(produto.qtdEstoque) - parseFloat(itens[i].qtdSaida);
                                            Produto.update(produto, {
                                                where: {
                                                    id: produto.id
                                                }
                                            }).then(response => {
                                                if(response) {
                                                    propriedadesProduto.forEach(propriedade => {
                                                        if(propriedade.idProduto == item.idProduto && propriedade.id == item.idPropriedadeProduto) {
                                                            propriedade.qtdEstoque = parseFloat(propriedade.qtdEstoque) - parseFloat(item.qtdSaida);
                                                            PropriedadesProduto.update(propriedade, {
                                                                where: {
                                                                    id: propriedade.id
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }                                    
                                    });
                                }
                            });
                        });
                        res.status(200).json(true);
                    }

                    if(!response) {
                        res.status(200).json(false);
                    }
                });
            }
        });
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var setor = req.body.setor;
    var descricao = req.body.descricao;
    var idLocal = req.body.idLocal;

    var data = {
        setor: setor,
        descricao: descricao,
        idLocal: idLocal
    };

    Saida.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Saida.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
