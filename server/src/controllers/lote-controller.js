'use strict';
const Helpers = require("./../../helpers/helpers");
const Contrato = require('./../models/Contrato');
const Lote = require('./../models/Lote');
const Fornecedor = require('./../models/Fornecedor');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Lote.findAll().then(response => {
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
    Lote.findAll().then(response => {
        var lotes = JSON.parse(JSON.stringify(response));
        Contrato.findAll().then(response => {
            var contratos = JSON.parse(JSON.stringify(response));
            Fornecedor.findAll().then(response => {
                var fornecedores = JSON.parse(JSON.stringify(response));
                lotes.forEach(element => {
                    for(var i = 0; i < contratos.length; i++){
                        if(element.idContrato == contratos[i].id) {
                            element.contrato = contratos[i].numeroContrato;
                            break;
                        }
                    }
                    for(var i = 0; i < fornecedores.length; i++) {
                        if(element.idFornecedor == fornecedores[i].id) {
                            element.fornecedor = fornecedores[i].razaoSocial;
                            break;
                        }
                    }
                    element.situacao = element.situacao ? 'Ativo' : 'Inativo';
                    element.valorConsumido = "R$ " + element.valorConsumido.toString().replace('.', ',');
                    element.valorLote = "R$ " + element.valorLote.toString().replace('.', ',');
                });
    
                res.status(200).json(lotes);
            });
        });
    });
}

exports.post = (req, res, next) => {
    var numeroLote = req.body.numeroLote;
    var idContrato = req.body.idContrato;
    var valorLote = req.body.valorLote;
    var situacao = req.body.situacao == 'Ativo' ? true : false;
    var idFornecedor = req.body.idFornecedor;

    var data = {
        numeroLote: numeroLote,
        idContrato: idContrato,
        valorLote: Helpers.converteMoeda(valorLote),
        valorConsumido: 0.0,
        situacao: situacao,
        idFornecedor: idFornecedor,
        createdAt: Helpers.getDataHoraAtual()
    };
    
    Lote.create(data).then(response => {
        res.status(200).json(response);
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var numeroLote = req.body.numeroLote;
    var idContrato = req.body.idContrato;
    var valorLote = req.body.valorLote;
    var situacao = req.body.situacao == 'Ativo' ? true : false;
    var idFornecedor = req.body.idFornecedor;

    var data = {
        numeroLote: numeroLote,
        idContrato: idContrato,
        valorLote: Helpers.converteMoeda(valorLote),
        situacao: situacao,
        idFornecedor: idFornecedor,
        createdAt: Helpers.getDataHoraAtual()
    };
    
    Lote.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Lote.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
