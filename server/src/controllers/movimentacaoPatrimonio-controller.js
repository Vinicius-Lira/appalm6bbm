'use strict';
const Helpers = require("./../../helpers/helpers");
const MovimentacaoPatrimonio = require('./../models/MovimentacaoPatrimonio');

exports.get = (req, res, next) => {
    const id = req.params.id;
    MovimentacaoPatrimonio.findAll().then(response => {
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
    MovimentacaoPatrimonio.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var idPatrimonio = req.body.idPatrimonio;
    var idResponsavelAnterior = req.body.idResponsavelAnterior;
    var idResponsavelAtual = req.body.idResponsavelAtual;
    var idSetorAnterior = req.body.idSetorAnterior;
    var idSetorAtual = req.body.idSetorAtual;
    var idSituacaoAnterior = req.body.idSituacaoAnterior;
    var idSituacaoAtual = req.body.idSituacaoAtual;
    var detalheAnterior = req.body.detalheAnterior;
    var detalheAtual = req.body.detalheAtual;
    var dataMovimentacao = req.body.dataMovimentacao;

    var data = {
        idPatrimonio: idPatrimonio,
        idResponsavelAnterior: idResponsavelAnterior,
        idResponsavelAtual: idResponsavelAtual,
        idSetorAnterior: idSetorAnterior,
        idSetorAtual: idSetorAtual,
        idSituacaoAnterior: idSituacaoAnterior,
        idSituacaoAtual: idSituacaoAtual,
        detalheAnterior: detalheAnterior,
        detalheAtual: detalheAtual,
        dataMovimentacao: dataMovimentacao,
        createdAt: Helpers.getDataHoraAtual()
    };

    MovimentacaoPatrimonio.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var idPatrimonio = req.body.idPatrimonio;
    var idResponsavelAnterior = req.body.idResponsavelAnterior;
    var idResponsavelAtual = req.body.idResponsavelAtual;
    var idSetorAnterior = req.body.idSetorAnterior;
    var idSetorAtual = req.body.idSetorAtual;
    var idSituacaoAnterior = req.body.idSituacaoAnterior;
    var idSituacaoAtual = req.body.idSituacaoAtual;
    var detalheAnterior = req.body.detalheAnterior;
    var detalheAtual = req.body.detalheAtual;
    var dataMovimentacao = req.body.dataMovimentacao;

    var data = {
        idPatrimonio: idPatrimonio,
        idResponsavelAnterior: idResponsavelAnterior,
        idResponsavelAtual: idResponsavelAtual,
        idSetorAnterior: idSetorAnterior,
        idSetorAtual: idSetorAtual,
        idSituacaoAnterior: idSituacaoAnterior,
        idSituacaoAtual: idSituacaoAtual,
        detalheAnterior: detalheAnterior,
        detalheAtual: detalheAtual,
        dataMovimentacao: dataMovimentacao,
    };

    MovimentacaoPatrimonio.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    MovimentacaoPatrimonio.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
