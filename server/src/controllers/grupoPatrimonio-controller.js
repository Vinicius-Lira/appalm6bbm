'use strict';
const Helpers = require("./../../helpers/helpers");
const GrupoPatrimonio = require('./../models/GrupoPatrimonio');

exports.get = (req, res, next) => {
    const id = req.params.id;
    GrupoPatrimonio.findAll().then(response => {
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
    GrupoPatrimonio.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var grupo = req.body.grupo;

    var data = {
        grupo: grupo,
        createdAt: Helpers.getDataHoraAtual()
    };

    GrupoPatrimonio.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var grupo = req.body.grupo;

    var data = {
        grupo: grupo
    };

    GrupoPatrimonio.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    GrupoPatrimonio.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
