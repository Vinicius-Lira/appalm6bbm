'use strict';
const Helpers = require("./../../helpers/helpers");
const Permissao = require('./../models/Permissao');
const Pessoa = require('./../models/Pessoa');

exports.get = (req, res, next) => {
    const usuario = req.params.usuario;
    Permissao.findAll().then(response => {
        var permissoes = JSON.parse(JSON.stringify(response));
        Pessoa.findAll().then(response => {
            var pessoas = JSON.parse(JSON.stringify(response));
            var countPessoa = 0;
            var resposta = null;
            for(countPessoa in pessoas) {
                if(pessoas[countPessoa].usuario.localeCompare(usuario) == 0) {
                    for(var i = 0; i < permissoes.length; i++){
                        if(permissoes[i].idResponsavel == pessoas[countPessoa].id) {
                            resposta = permissoes[i];
                            break;
                        }
                    }
                    break;
                }
            }
            res.status(200).json(resposta);
        });
    });
}

exports.getById = (req, res, next) => {
    const idResponsavel = req.params.idResponsavel;
    Permissao.findAll().then(response => {
        var permissoes = JSON.parse(JSON.stringify(response));
        var counter = 0;

        for(counter in permissoes) {
            if(permissoes[counter].idResponsavel == idResponsavel) {
                res.status(200).json(permissoes[counter]);
                break;
            }
        }
    });
}

exports.post = (req, res, next) => {
    var idResponsavel = req.body.idResponsavel;
    var cadastrosCadastrar = req.body.cadastrosCadastrar;
    var cadastrosEditar = req.body.cadastrosEditar;
    var cadastrosApagar = req.body.cadastrosApagar;
    var patrimonioCadastrar = req.body.patrimonioCadastrar;
    var patrimonioEditar = req.body.patrimonioEditar;
    var patrimonioApagar = req.body.patrimonioApagar;
    var patrimonioMovimentar = req.body.patrimonioMovimentar;
    var patrimonioMovimentarEditar = req.body.patrimonioMovimentarEditar;
    var patrimonioMovimentarApagar = req.body.patrimonioMovimentarApagar;
    var patrimonioDescarregar = req.body.patrimonioDescarregar;
    var patrimonioDescarregarEditar = req.body.patrimonioDescarregarEditar;
    var patrimonioDescarregarApagar = req.body.patrimonioDescarregarApagar;

    var data = {
        idResponsavel: idResponsavel,
        cadastrosCadastrar: cadastrosCadastrar,
        cadastrosEditar: cadastrosEditar,
        cadastrosApagar: cadastrosApagar,
        patrimonioCadastrar: patrimonioCadastrar,
        patrimonioEditar: patrimonioEditar,
        patrimonioApagar: patrimonioApagar,
        patrimonioMovimentar: patrimonioMovimentar,
        patrimonioMovimentarEditar: patrimonioMovimentarEditar,
        patrimonioMovimentarApagar: patrimonioMovimentarApagar,
        patrimonioDescarregar: patrimonioDescarregar,
        patrimonioDescarregarEditar: patrimonioDescarregarEditar,
        patrimonioDescarregarApagar: patrimonioDescarregarApagar,
        createdAt: Helpers.getDataHoraAtual()
    };

    Permissao.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var idResponsavel = req.body.idResponsavel;
    var cadastrosCadastrar = req.body.cadastrosCadastrar;
    var cadastrosEditar = req.body.cadastrosEditar;
    var cadastrosApagar = req.body.cadastrosApagar;
    var patrimonioCadastrar = req.body.patrimonioCadastrar;
    var patrimonioEditar = req.body.patrimonioEditar;
    var patrimonioApagar = req.body.patrimonioApagar;
    var patrimonioMovimentar = req.body.patrimonioMovimentar;
    var patrimonioMovimentarEditar = req.body.patrimonioMovimentarEditar;
    var patrimonioMovimentarApagar = req.body.patrimonioMovimentarApagar;
    var patrimonioDescarregar = req.body.patrimonioDescarregar;
    var patrimonioDescarregarEditar = req.body.patrimonioDescarregarEditar;
    var patrimonioDescarregarApagar = req.body.patrimonioDescarregarApagar;

    var data = {
        idResponsavel: idResponsavel,
        cadastrosCadastrar: cadastrosCadastrar,
        cadastrosEditar: cadastrosEditar,
        cadastrosApagar: cadastrosApagar,
        patrimonioCadastrar: patrimonioCadastrar,
        patrimonioEditar: patrimonioEditar,
        patrimonioApagar: patrimonioApagar,
        patrimonioMovimentar: patrimonioMovimentar,
        patrimonioMovimentarEditar: patrimonioMovimentarEditar,
        patrimonioMovimentarApagar: patrimonioMovimentarApagar,
        patrimonioDescarregar: patrimonioDescarregar,
        patrimonioDescarregarEditar: patrimonioDescarregarEditar,
        patrimonioDescarregarApagar: patrimonioDescarregarApagar,
        createdAt: Helpers.getDataHoraAtual()
    };

    Permissao.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response.data);
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
