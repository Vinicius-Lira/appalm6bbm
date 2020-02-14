'use strict';

const Helpers = require('./../../../helpers/helpers');
const Pessoa = require('./../../models/cadastros/Pessoa');
const Hierarquia = require('./../../models/cadastros/Hierarquia');
const Obm = require('./../../models/cadastros/Obm');
const Setor = require('./../../models/cadastros/Setor');
const Permissao = require('./../../models/cadastros/Permissao');


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

exports.getByUsuario = (req, res, next) => {
    const usuario = req.params.usuario;
    Pessoa.findAll().then(response => {
        var find = [];
        var data = JSON.parse(JSON.stringify(response));
        for(var i = 0; i < data.length; i++){
            if(data[i].usuario.localeCompare(usuario) == 0) {
                find = data[i] ;
                break;
            }
        }

        res.status(200).json(find);
    });

}

exports.getAll = (req, res, next) => {
    Hierarquia.findAll().then(response => {
        var hierarquias = JSON.parse(JSON.stringify(response));
        Obm.findAll().then(response => {
            var obms = JSON.parse(JSON.stringify(response));
            Setor.findAll().then(response => {
                var setores = JSON.parse(JSON.stringify(response));

                Pessoa.findAll().then(response => {
                    var pessoas = JSON.parse(JSON.stringify(response));
                    var i = 0;
                    var x = 0;

                    for(i in pessoas){
                        for(x in hierarquias){
                            if(hierarquias[x].id == pessoas[i].idHierarquia){
                                pessoas[i].hierarquia = hierarquias[x].hierarquia;
                                break;
                            }
                        }

                        x = 0;
                        for(x in obms){
                            if(obms[x].id == pessoas[i].idBatalhao){
                                pessoas[i].obm = obms[x].abreviacao;
                                break;
                            }
                        }

                        x = 0;
                        for(x in setores){
                            if(setores[x].id == pessoas[i].idSetor){
                                pessoas[i].setor = setores[x].setor;
                                break;
                            }
                        }
                        x = 0;
                    }

                    res.status(200).json(pessoas);
                });

            });
        });
    });

}

exports.post = (req, res, next) => {
    var email = req.body.email;
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var idHierarquia = req.body.idHierarquia;
    var idSetor = req.body.idSetor;
    var idBatalhao = req.body.idBatalhao;
    var tipoPessoa = req.body.tipoPessoa;
    var dataNascimento = req.body.dataNascimento;
    var sexo = req.body.sexo;

    var data = {
        nome: nome,
        usuario: getUsuarioEmail(email),
        email: email,
        matricula: matricula,
        idHierarquia: idHierarquia,
        idSetor: idSetor,
        idBatalhao: idBatalhao,
        tipoPessoa: tipoPessoa,
        dataNascimento: dataNascimento,
        sexo: sexo,
        createdAt: Helpers.getDataHoraAtual()
    };

    Pessoa.create(data).then(response => {
        var pessoa = JSON.parse(JSON.stringify(response));
        if(response) {
            var data = {
                idResponsavel: pessoa.id,
                cadastrosCadastrar: false,
                cadastrosEditar: false,
                cadastrosApagar: false,
                patrimonioCadastrar: false,
                patrimonioEditar: false,
                patrimonioApagar: false,
                patrimonioMovimentar: false,
                patrimonioMovimentarEditar: false,
                patrimonioMovimentarApagar: false,
                patrimonioDescarregar: false,
                patrimonioDescarregarEditar: false,
                patrimonioDescarregarApagar: false,
                createdAt: Helpers.getDataHoraAtual()
            };
            Permissao.create(data).then(response => {
                res.status(200).json(response);
            });
        }
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
    var tipoPessoa = req.body.tipoPessoa;
    var dataNascimento = req.body.dataNascimento;
    var sexo = req.body.sexo;

    var data = {
        nome: nome,
        usuario: getUsuarioEmail(email),
        email: email,
        matricula: matricula,
        idHierarquia: idHierarquia,
        idSetor: idSetor,
        idBatalhao: idBatalhao,
        tipoPessoa: tipoPessoa,
        dataNascimento: dataNascimento,
        sexo: sexo,
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
