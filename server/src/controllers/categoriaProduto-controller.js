'use strict';
const Helpers = require("./../../helpers/helpers");
const CategoriaProduto = require('./../models/CategoriaProduto');

exports.get = (req, res, next) => {
    const id = req.params.id;
    CategoriaProduto.findAll().then(response => {
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
    CategoriaProduto.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var categoria = req.body.categoria;

    var data = {
        categoria: categoria,
        createdAt: Helpers.getDataHoraAtual()
    };

    CategoriaProduto.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var categoria = req.body.categoria;

    var data = {
        categoria: categoria
    };

    CategoriaProduto.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    CategoriaProduto.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
