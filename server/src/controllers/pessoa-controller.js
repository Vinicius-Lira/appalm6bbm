'use strict';

const Helpers = require('./../../helpers/helpers');
const Pessoa = require('./../models/Pessoa');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Pessoa.findAll().then(response => {
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
    Pessoa.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var email = req.body.email;
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var idHierarquia = req.body.idHierarquia;
    var idSetor = req.body.idSetor;
    var idBatalhao = req.body.idBatalhao;

    var data = {
        nome: nome,
        usuario: getUsuarioEmail(email),
        email: email,
        matricula: matricula,
        idHierarquia: idHierarquia,
        idSetor: idSetor,
        idBatalhao: idBatalhao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Pessoa.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var email = req.body.email;
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var idHierarquia = req.body.idHierarquia;
    var idSetor = req.body.idSetor;
    var idBatalhao = req.body.idBatalhao;

    var data = {
        nome: nome,
        usuario: getUsuarioEmail(email),
        email: email,
        matricula: matricula,
        idHierarquia: idHierarquia,
        idSetor: idSetor,
        idBatalhao: idBatalhao,
        createdAt: Helpers.getDataHoraAtual()
    };
    Pessoa.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Pessoa.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

function getUsuarioEmail(email) {
    var usuario = "";
    for(var i = 0; i < email.length;i++){
        if(email[i] == "@"){
            break;
        }else{
			usuario = usuario + email[i];
        }

    }
    return usuario;
}
