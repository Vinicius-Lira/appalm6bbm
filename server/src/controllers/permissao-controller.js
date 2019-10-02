'use strict';
const Helpers = require("./../../helpers/helpers");
const Permissao = require('./../models/Permissao');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Permissao.findAll().then(response => {
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
    Permissao.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var idResponsavel = req.body.idResponsavel;
    var cadastrar = req.body.cadastrar;
    var patrimonioCadastrar = req.body.patrimonioCadastrar;
    var patrimonioEditar = req.body.patrimonioEditar;
    var patrimonioMovimentar = req.body.patrimonioMovimentar;
    var patrimonioDescarregar = req.body.patrimonioDescarregar;

    var data = {
        idResponsavel: idResponsavel,
        cadastrar: cadastrar,
        patrimonioCadastrar: patrimonioCadastrar,
        patrimonioEditar: patrimonioEditar,
        patrimonioMovimentar: patrimonioMovimentar,
        patrimonioDescarregar: patrimonioDescarregar,
        createdAt: Helpers.getDataHoraAtual()
    };

    Permissao.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var idResponsavel = req.body.idResponsavel;
    var cadastrar = req.body.cadastrar;
    var patrimonioCadastrar = req.body.patrimonioCadastrar;
    var patrimonioEditar = req.body.patrimonioEditar;
    var patrimonioMovimentar = req.body.patrimonioMovimentar;
    var patrimonioDescarregar = req.body.patrimonioDescarregar;

    var data = {
        idResponsavel: idResponsavel,
        cadastrar: cadastrar,
        patrimonioCadastrar: patrimonioCadastrar,
        patrimonioEditar: patrimonioEditar,
        patrimonioMovimentar: patrimonioMovimentar,
        patrimonioDescarregar: patrimonioDescarregar
    };

    Permissao.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Permissao.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
