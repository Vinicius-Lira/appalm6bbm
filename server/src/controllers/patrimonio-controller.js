'use strict';
const Helpers = require("./../../helpers/helpers");
const Patrimonio = require('./../models/Patrimonio');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Patrimonio.findAll().then(response => {
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
    Patrimonio.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var codigo = req.body.codigo;
    var vinculo = req.body.vinculo;
    var identificacao = req.body.identificacao;
    var descricao = req.body.descricao;
    var observacoes = req.body.observacoes;
    var dataEntrada = req.body.dataEntrada;
    var idResponsavel = req.body.idResponsavel;
    var idGrupo = req.body.idGrupo;
    var idSetor = req.body.idSetor;
    var idSituacao = req.body.idSituacao;
    var valorEconomico = req.body.valorEconomico;
    var dataCarga = req.body.dataCarga;
    var foto = req.body.foto;
    var baixado = req.body.baixado;

    var data = {
        codigo: codigo,
        vinculo: vinculo,
        identificacao: identificacao,
        descricao: descricao,
        observacoes: observacoes,
        dataEntrada: dataEntrada,
        idResponsavel: idResponsavel,
        idGrupo: idGrupo,
        idSetor: idSetor,
        idSituacao: idSituacao,
        valorEconomico: valorEconomico,
        dataCarga: dataCarga,
        foto: foto,
        baixado: baixado,
        createdAt: Helpers.getDataHoraAtual()
    };

    Patrimonio.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var codigo = req.body.codigo;
    var vinculo = req.body.vinculo;
    var identificacao = req.body.identificacao;
    var descricao = req.body.descricao;
    var observacoes = req.body.observacoes;
    var dataEntrada = req.body.dataEntrada;
    var idResponsavel = req.body.idResponsavel;
    var idGrupo = req.body.idGrupo;
    var idSetor = req.body.idSetor;
    var idSituacao = req.body.idSituacao;
    var valorEconomico = req.body.valorEconomico;
    var dataCarga = req.body.dataCarga;
    var foto = req.body.foto;
    var baixado = req.body.baixado;

    var data = {
        codigo: codigo,
        vinculo: vinculo,
        identificacao: identificacao,
        descricao: descricao,
        observacoes: observacoes,
        dataEntrada: dataEntrada,
        idResponsavel: idResponsavel,
        idGrupo: idGrupo,
        idSetor: idSetor,
        idSituacao: idSituacao,
        valorEconomico: valorEconomico,
        dataCarga: dataCarga,
        foto: foto,
        baixado: baixado,
        createdAt: Helpers.getDataHoraAtual()
    };

    Patrimonio.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Patrimonio.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
