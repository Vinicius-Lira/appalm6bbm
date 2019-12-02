'use strict';
const Helpers = require("./../../helpers/helpers");
const PropriedadesProduto = require('./../models/PropriedadesProduto');
const Produto = require('./../models/Produto');
const Lote = require('./../models/Lote');
const ProdutosLote = require('./../models/ProdutosLote');

exports.get = (req, res, next) => {
    const id = req.params.id;
    PropriedadesProduto.findAll().then(response => {
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

exports.getByIdProdutoIdContrato = (req, res, next) => {
    var idProduto = req.params.idProduto;
    var idContrato = req.params.idContrato;

    PropriedadesProduto.findAll().then(response => {
        var propriedadesProduto = JSON.parse(JSON.stringify(response));
        Produto.findAll().then(response => {
            var produtos = JSON.parse(JSON.stringify(response));
            var propriedadesProdutoBuscado = [];

            Lote.findAll().then(response => {
                var lotes = JSON.parse(JSON.stringify(response));
                ProdutosLote.findAll().then(response => {
                    var produtosLote = JSON.parse(JSON.stringify(response));
                    var propriedadesProdutosLote = [];
                    lotes.forEach(lote => {
                        if(lote.idContrato == idContrato){
                            produtosLote.forEach(produto => {
                                if(produto.idLote == lote.id) {
                                    propriedadesProdutosLote.push(produto.idPropriedadeProduto);
                                }
                            });
                        }
                    });

                    propriedadesProduto.forEach(element => {
                        if(element.idProduto == idProduto) {
                            propriedadesProdutosLote.forEach(id => {
                                if(id == element.id){
                                    propriedadesProdutoBuscado.push(element);
                                }
                            });
                        }
                    });
                    
                    propriedadesProdutoBuscado.forEach(element => {
                        for(var i = 0; i < produtos.length; i++) {
                            if(element.idProduto == produtos[i].id) {
                                element.produto = produtos[i].produto;
                                break;
                            }
                        }
                    });

                    res.status(200).json(propriedadesProdutoBuscado);
                });
            });
            
            
        });
    });
}

exports.getByIdProduto = (req, res, next) => {
    var idProduto = req.params.idProduto;

    PropriedadesProduto.findAll().then(response => {
        var propriedadesProduto = JSON.parse(JSON.stringify(response));
        Produto.findAll().then(response => {
            var produtos = JSON.parse(JSON.stringify(response));
            var propriedadesProdutoBuscado = [];
            
            propriedadesProduto.forEach(element => {
                if(element.idProduto == idProduto) {
                    propriedadesProdutoBuscado.push(element);
                }
            });
            
            propriedadesProdutoBuscado.forEach(element => {
                for(var i = 0; i < produtos.length; i++) {
                    if(element.idProduto == produtos[i].id) {
                        element.produto = produtos[i].produto;
                        break;
                    }
                }
            });

            res.status(200).json(propriedadesProdutoBuscado);
            
        });
    });
}

exports.getAll = (req, res, next) => {
    PropriedadesProduto.findAll().then(response => {
        var propriedadesProduto = JSON.parse(JSON.stringify(response));
        Produto.findAll().then(response => {
            var produtos = JSON.parse(JSON.stringify(response));
            propriedadesProduto.forEach(element => {
                for(var i = 0; i < produtos.length; i++) {
                    if(element.idProduto == produtos[i].id) {
                        element.produto = produtos[i].produto;
                        break;
                    }
                }
            });
            res.status(200).json(propriedadesProduto);
        });
    });
}

exports.post = (req, res, next) => {
    var idProduto = req.body.idProduto;
    var tamanho = req.body.tamanho;
    var cor = req.body.cor;
    var qtdEstoque = req.body.qtdEstoque;
    var qtdMinima = req.body.qtdMinima;

    var data = {
        idProduto: idProduto,
        tamanho: tamanho,
        cor: cor,
        qtdEstoque: qtdEstoque,
        qtdMinima: qtdMinima,
        createdAt: Helpers.getDataHoraAtual()
    };

    PropriedadesProduto.create(data).then(response => {
        Produto.findAll().then(response => {
            var produtos = JSON.parse(JSON.stringify(response));
            for(var i = 0; i < produtos.length; i++) {
                if(produtos[i].id == data.idProduto) {
                    produtos[i].qtdEstoque += parseInt(data.qtdEstoque);
                    Produto.update( produtos[i], {
                        where: {
                            id:  produtos[i].id
                        }
                    }).then(response => {
                        res.status(200).json(JSON.parse(JSON.stringify(response)));
                    });
                    break;
                }
            }
        });
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var idProduto = req.body.idProduto;
    var tamanho = req.body.tamanho;
    var cor = req.body.cor;
    var qtdEstoque = req.body.qtdEstoque;
    var qtdMinima = req.body.qtdMinima;

    var data = {
        idProduto: idProduto,
        tamanho: tamanho,
        cor: cor,
        qtdEstoque: qtdEstoque,
        qtdMinima: qtdMinima
    };

    PropriedadesProduto.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    PropriedadesProduto.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
