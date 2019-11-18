'use strict';
const Helpers = require("./../../helpers/helpers");
const Contrato = require('./../models/Contrato');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Contrato.findAll().then(response => {
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
    Contrato.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var numeroContrato = req.body.numeroContrato;
    var tipoContrato = req.body.tipoContrato;
    var dataHomologacao = req.body.dataHomologacao;
    var dataVigencia = req.body.dataVigencia;
    var categoria = req.body.categoria;
    var situacao = req.body.situacao;

    var data = {
        numeroContrato: numeroContrato,
        tipoContrato: tipoContrato,
        dataHomologacao: dataHomologacao,
        dataVigencia: dataVigencia,
        categoria: categoria,
        situacao :situacao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Contrato.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var numeroContrato = req.body.numeroContrato;
    var tipoContrato = req.body.tipoContrato;
    var dataHomologacao = req.body.dataHomologacao;
    var dataVigencia = req.body.dataVigencia;
    var categoria = req.body.categoria;
    var situacao = req.body.situacao;

    var data = {
        numeroContrato: numeroContrato,
        tipoContrato: tipoContrato,
        dataHomologacao: dataHomologacao,
        dataVigencia: dataVigencia,
        categoria: categoria,
        situacao :situacao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Contrato.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Contrato.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
