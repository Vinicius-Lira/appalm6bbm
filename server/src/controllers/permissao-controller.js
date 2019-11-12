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
