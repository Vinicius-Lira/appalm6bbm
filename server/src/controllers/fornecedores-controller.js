'use strict';
const Helpers = require("./../../helpers/helpers");
const Fornecedor = require('./../models/Fornecedor');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Fornecedor.findAll().then(response => {
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
    Fornecedor.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var cnpj = req.body.cnpj;
    var representante = req.body.representante;
    var razaoSocial = req.body.razaoSocial;
    var nomeFantasia = req.body.nomeFantasia;
    var cep = req.body.cep;
    var endereco = req.body.endereco;
    var numero  = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var telefoneFixo = req.body.telefoneFixo;
    var telefoneCelular = req.body.telefoneCelular;
    var email = req.body.email;

    var data = {
        cnpj: cnpj,
        representante: representante,
        razaoSocial: razaoSocial,
        nomeFantasia: nomeFantasia,
        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        telefoneFixo: telefoneFixo,
        telefoneCelular: telefoneCelular,
        email: email,
        createdAt: Helpers.getDataHoraAtual()
    };

    Fornecedor.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var cnpj = req.body.cnpj;
    var representante = req.body.representante;
    var razaoSocial = req.body.razaoSocial;
    var nomeFantasia = req.body.nomeFantasia;
    var cep = req.body.cep;
    var endereco = req.body.endereco;
    var numero  = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var telefoneFixo = req.body.telefoneFixo;
    var telefoneCelular = req.body.telefoneCelular;
    var email = req.body.email;

    var data = {
        cnpj: cnpj,
        representante: representante,
        razaoSocial: razaoSocial,
        nomeFantasia: nomeFantasia,
        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        telefoneFixo: telefoneFixo,
        telefoneCelular: telefoneCelular,
        email: email,
        createdAt: Helpers.getDataHoraAtual()
    };

    Fornecedor.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Fornecedor.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
