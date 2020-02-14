'use strict';
const Helpers = require("./../../../helpers/helpers");
const ResponsavelSetor = require('./../../models/cadastros/ResponsavelSetor');

exports.get = (req, res, next) => {
    const id = req.params.id;
    ResponsavelSetor.findAll().then(response => {
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
    ResponsavelSetor.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var idSetor = req.body.idSetor;
    var idResponsavel = req.body.idResponsavel;

    var data = {
        idSetor: idSetor,
        idResponsavel: idResponsavel,
        createdAt: Helpers.getDataHoraAtual()
    };

    ResponsavelSetor.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var idSetor = req.body.idSetor;
    var idResponsavel = req.body.idResponsavel;

    var data = {
        idSetor: idSetor,
        idResponsavel: idResponsavel
    };

    ResponsavelSetor.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    ResponsavelSetor.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
