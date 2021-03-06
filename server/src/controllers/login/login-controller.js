'use strict';
const Helpers = require("./../../../helpers/helpers");
const Login = require('./../../models/login/Login');
const Pessoa = require('./../../models/cadastros/Pessoa');
const axios = require('axios');

require('dotenv').config();

const { SERVER_LOGIN_URL } = process.env;

exports.autenticaSaida = (req, res, next) => {
    var idUsuario = req.body.idUsuario;
    var senha = req.body.senha;

    Pessoa.findAll().then(response => {
        var pessoas = response;
        var i = 0;
        for(i in pessoas){
            if(pessoas[i].id === idUsuario){
                res.status(200).json(true);
                axios.get(SERVER_LOGIN_URL + '?usuario=' + pessoas[i].usuario + '&' + 'passwd=' + senha).then(response => {
                    console.log(response);
                    if(response.data){
                        res.status(200).json(true);
                    }else {
                        res.status(200).json(false);
                    }
                });
                break;
            }
        }
    });
}

exports.post = (req, res, next) => {
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    var token = Helpers.generateToken();

    var data = {
        usuario: usuario,
        token: token,
        sessaoValida: true,
        createdAt: Helpers.getDataHoraAtual()
    };

    Pessoa.findAll().then(response => {
        var pessoas = response;
        var i = 0, existeUsuario = false;
        for(i in pessoas){
            if(pessoas[i].usuario === usuario){
                existeUsuario = true;
                break;
            }
        }

        if(existeUsuario) {
            Login.create(data).then(response => {
                if(response){
                    axios.get((SERVER_LOGIN_URL + '/?usuario=' + usuario + '&' + 'passwd=' + senha).then(response => {
                        if(response.data){
                            res.status(200).json({
                                response: true,
                                mensage: 'Login realizado com sucesso!',
                                token: token
                            });
                        }else {
                            res.status(200).json({
                                response: false,
                                mensage: 'Usuário ou senha incorreto!'
                            });
                        }
                    });
                }else {
                    res.status(200).json({
                        response: false,
                        mensage: 'Ocorreu um erro durante o login!'
                    });
                }
            });
        }else {
            res.status(200).json({
                response: false,
                mensage: 'Usuário não cadastrado!'
            });
        }

    });
}

exports.validToken = (req, res, next) => {
    var token = req.body.token;

    Login.findAll().then(response => {
        var logins = response;
        var i = 0, resposta = false;
        for(i in logins) {
            var segundos = Helpers.calculaSegundosSessao(logins[i].createdAt);

            if(token.localeCompare(logins[i].token) == 0 && logins[i].sessaoValida == true) {
                resposta = true;
                segundos.then(response => {
                    if(response > 7200){
                        resposta = false;
                        revogaSessao(logins[i].id);
                    }
                })

                break;
            }
        }
        res.status(200).json(resposta);
    });

    async function revogaSessao(id) {
        var data = {
            sessaoValida: false,
        };

        Login.update(data, {
            where: {
                id: id
            }
        });
    }
}

exports.loginoff = (req, res, next) => {
    var token = req.body.token;

    Login.findAll().then(response => {
        var logins = response;
        var i = 0;
        var resposta = false;
        for(i in logins) {
            if(token.localeCompare(logins[i].token) == 0 && logins[i].sessaoValida == true) {
                var data = {
                    sessaoValida: false
                };
                Login.update(data, {
                    where: {
                        id: logins[i].id
                    }
                });

                resposta = false;
            }else {

            }
        }

        res.status(200).json(resposta);
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var abreviacao = req.body.abreviacao;
    var descricao = req.body.descricao;

    var data = {
        abreviacao: abreviacao,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Login.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
