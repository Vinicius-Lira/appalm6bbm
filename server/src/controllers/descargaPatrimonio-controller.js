'use strict';
const Helpers = require("./../../helpers/helpers");
const DescargaPatrimonio = require('./../models/DescargaPatrimonio');

exports.get = (req, res, next) => {
    const id = req.params.id;
    DescargaPatrimonio.findAll().then(response => {
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
    DescargaPatrimonio.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var idPatrimonio = req.body.idPatrimonio;
    var idUltimoResponsavel = req.body.idUltimoResponsavel;
    var idResponsavelRecebimento = req.body.idUltimoResponsavel;
    var idSetor = req.body.idSetor;
    var observacoes = req.body.observacoes;
    var dataBaixa = req.body.dataBaixa;

    var data = {
        idPatrimonio: idPatrimonio,
        idUltimoResponsavel: idUltimoResponsavel,
        idResponsavelRecebimento: idResponsavelRecebimento,
        idSetor: idSetor,
        observacoes: observacoes,
        dataBaixa: dataBaixa,
        createdAt: Helpers.getDataHoraAtual()
    };

    DescargaPatrimonio.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var idPatrimonio = req.body.idPatrimonio;
    var idUltimoResponsavel = req.body.idUltimoResponsavel;
    var idResponsavelRecebimento = req.body.idUltimoResponsavel;
    var idSetor = req.body.idSetor;
    var observacoes = req.body.observacoes;
    var dataBaixa = req.body.dataBaixa;

    var data = {
        idPatrimonio: idPatrimonio,
        idUltimoResponsavel: idUltimoResponsavel,
        idResponsavelRecebimento: idResponsavelRecebimento,
        idSetor: idSetor,
        observacoes: observacoes,
        dataBaixa: dataBaixa
    };

    DescargaPatrimonio.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    DescargaPatrimonio.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
