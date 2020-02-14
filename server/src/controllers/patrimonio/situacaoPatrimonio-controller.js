'use strict';
const Helpers = require("./../../../helpers/helpers");
const SituacaoPatrimonio = require('./../../models/patrimonio/SituacaoPatrimonio');

exports.get = (req, res, next) => {
    const id = req.params.id;
    SituacaoPatrimonio.findAll().then(response => {
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
    SituacaoPatrimonio.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var situacao = req.body.situacao;
    var descricao = req.body.descricao;

    var data = {
        situacao: situacao,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    SituacaoPatrimonio.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var situacao = req.body.situacao;
    var descricao = req.body.descricao;

    var data = {
        situacao: situacao,
        descricao: descricao
    };

    SituacaoPatrimonio.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    SituacaoPatrimonio.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
