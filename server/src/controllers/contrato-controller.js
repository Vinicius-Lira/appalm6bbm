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
        var contratos = JSON.parse(JSON.stringify(response));
        contratos.forEach(element => {
            if(element.dataHomologacao != null && element.dataVigencia != null) {
                element.dataHomologacao = element.dataHomologacao.split('T')[0].split('-').reverse().join('/');
                element.dataVigencia = element.dataVigencia.split('T')[0].split('-').reverse().join('/');
                element.valorContrato = "R$ " + element.valorContrato.toString().replace('.', ',');
                element.valorConsumido = "R$ " + element.valorConsumido.toString().replace('.', ',');
            }
            if(element.situacao) {
                element.situacao = "Ativo";
            }

            if(!element.situacao) {
                element.situacao = "Inativo";
            }
        });
        res.status(200).json(contratos);
    });
}

exports.post = (req, res, next) => {
    var numeroContrato = req.body.numeroContrato;
    var tipoContrato = req.body.tipoContrato;
    var dataHomologacao = req.body.dataHomologacao;
    var dataVigencia = req.body.dataVigencia;
    var categoria = req.body.categoria;
    var situacao = req.body.situacao == "Ativo" ? true : false;
    var valorContrato = req.body.valorContrato;

    var data = {
        numeroContrato: numeroContrato,
        tipoContrato: tipoContrato,
        dataHomologacao: dataHomologacao.split('/').reverse().join('-'),
        dataVigencia: dataVigencia.split('/').reverse().join('-'),
        categoria: categoria,
        situacao: situacao,
        valorContrato: Helpers.converteMoeda(valorContrato),
        valorConsumido: 0.0,
        saldo: Helpers.converteMoeda(valorContrato),
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
    var situacao = req.body.situacao == "Ativo" ? true : false;
    var valorContrato = req.body.valorContrato;

    var data = {
        numeroContrato: numeroContrato,
        tipoContrato: tipoContrato,
        dataHomologacao: dataHomologacao.split('/').reverse().join('-'),
        dataVigencia: dataVigencia.split('/').reverse().join('-'),
        categoria: categoria,
        situacao :situacao,
        valorContrato: Helpers.converteMoeda(valorContrato),
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
