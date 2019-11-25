'use strict';
const Helpers = require("./../../helpers/helpers");
const ProdutosLote = require('./../models/ProdutosLote');
const Produto = require('./../models/Produto');

exports.get = (req, res, next) => {
    const id = req.params.id;
    ProdutosLote.findAll().then(response => {
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
    var idLote = req.params.idLote;
    var produtosDoLote = [];
    ProdutosLote.findAll().then(response => {
        var produtosLote = JSON.parse(JSON.stringify(response));
        Produto.findAll().then(response => {
            var produtos = JSON.parse(JSON.stringify(response));
            produtosLote.forEach(element => {
                for(var i = 0; i < produtos.length; i++){
                    if(element.idProduto == produtos[i].id) {
                        element.produto = produtos[i].produto;
                        break;
                    }
                }

                element.valorUnitario  = "R$ " + element.valorUnitario.toString().replace(".", ",");
                if(element.idLote == idLote) {
                    produtosDoLote.push(element);
                }
            });

            res.status(200).json(produtosDoLote);
        });
    });
    
}

exports.post = (req, res, next) => {
    var idLote = req.body.idLote;
    var idProduto = req.body.idProduto;
    var qtdContratada = req.body.qtdContratada;
    var valorUnitario = req.body.valorUnitario;

    var data = {
        idLote: idLote,
        idProduto: idProduto,
        qtdContratada: qtdContratada,
        valorUnitario: Helpers.converteMoeda(valorUnitario),
        qtdRecebida: 0.0,
        qtdRestante: 0.0,
        createdAt: Helpers.getDataHoraAtual()
    };
    console.log(data);
    ProdutosLote.create(data).then(response => {
        res.status(200).json(response);
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var idLote = req.body.idLote;
    var idProduto = req.body.idProduto;
    var qtdContratada = req.body.qtdContratada;
    var valorUnitario = req.body.valorUnitario;

    var data = {
        idLote: idLote,
        idProduto: idProduto,
        qtdContratada: qtdContratada,
        valorUnitario: Helpers.converteMoeda(valorUnitario)
    };

    ProdutosLote.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    ProdutosLote.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
