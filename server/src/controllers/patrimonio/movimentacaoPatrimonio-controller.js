'use strict';
const Helpers = require("./../../../helpers/helpers");
const MovimentacaoPatrimonio = require('./../../models/patrimonio/MovimentacaoPatrimonio');
const Patrimonio = require('./../../models/patrimonio/Patrimonio');
const Pessoa = require('./../../models/cadastros/Pessoa');
const Setor = require('./../../models/cadastros/Setor');

exports.get = (req, res, next) => {
    const id = req.params.id;
    MovimentacaoPatrimonio.findAll().then(response => {
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
    MovimentacaoPatrimonio.findAll().then(response => {
        var movimentacoes = JSON.parse(JSON.stringify(response));
        Patrimonio.findAll().then(response => {
            const patrimonios = response;
            Pessoa.findAll().then(response => {
                const pessoas = response;
                Setor.findAll().then(response => {
                    const setores = response;

                    for(var i in movimentacoes) {
                        var k = 0;
                        for(k in patrimonios){
                            if(movimentacoes[i].idPatrimonio === patrimonios[k].id) {
                                movimentacoes[i].codigo = patrimonios[k].codigo;
                                movimentacoes[i].identificacao = patrimonios[k].identificacao;
                                break;
                            }
                        }
                        k = 0;
                        for(k in pessoas) {
                            if(movimentacoes[i].idResponsavelAtual === pessoas[k].id){
                                movimentacoes[i].responsavelNovo = pessoas[k].nome;
                                break;
                            }
                        }
                        k = 0;
                        for(k in pessoas) {
                            if(movimentacoes[i].idResponsavelAnterior === pessoas[k].id){
                                movimentacoes[i].responsavelAnterior = pessoas[k].nome;
                                break;
                            }
                        }
                        k = 0;
                        for(k in setores) {
                            if(movimentacoes[i].idSetorAnterior === setores[k].id){
                                movimentacoes[i].setorAnterior = setores[k].setor;
                                break;
                            }
                        }
                        k = 0;
                        for(k in setores) {
                            if(movimentacoes[i].idSetorAtual === setores[k].id){
                                movimentacoes[i].setorAtual = setores[k].setor;
                                break;
                            }
                        }
                        movimentacoes[i].dataMovimentacao = movimentacoes[i].dataMovimentacao.split('T')[0].split('-').reverse().join('/');
                    }

                    res.status(200).json(movimentacoes);
                });
            });
        });


    });
}

exports.post = (req, res, next) => {
    var idPatrimonio = req.body.idPatrimonio;
    var idResponsavelAnterior = req.body.idResponsavelAnterior;
    var idResponsavelAtual = req.body.idResponsavelAtual;
    var idSetorAnterior = req.body.idSetorAnterior;
    var idSetorAtual = req.body.idSetorAtual;
    var idSituacaoAnterior = req.body.idSituacaoAnterior;
    var idSituacaoAtual = req.body.idSituacaoAtual;
    var dataMovimentacao = req.body.dataMovimentacao;

    var data = {
        idPatrimonio: idPatrimonio,
        idResponsavelAnterior: idResponsavelAnterior,
        idResponsavelAtual: idResponsavelAtual,
        idSetorAnterior: idSetorAnterior,
        idSetorAtual: idSetorAtual,
        idSituacaoAnterior: idSituacaoAnterior,
        idSituacaoAtual: idSituacaoAtual,
        dataMovimentacao: dataMovimentacao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Patrimonio.findAll().then(response => {
        const patrimonios = JSON.parse(JSON.stringify(response));
        var counter = 0;
        var patrimonioMovimentado  = {};
        for(counter in patrimonios) {
            if(patrimonios[counter].id === data.idPatrimonio) {
                patrimonioMovimentado = patrimonios[counter];
                data.idResponsavelAnterior = patrimonios[counter].idResponsavel;
                data.idSetorAnterior = patrimonios[counter].idSetor;
                data.idSituacaoAnterior = patrimonios[counter].idSituacao;

                patrimonioMovimentado.idResponsavel = data.idResponsavelAtual;
                patrimonioMovimentado.idSetor = data.idSetorAtual;
                patrimonioMovimentado.idSituacao = data.idSituacaoAtual;
            }
        }
        Patrimonio.update(patrimonioMovimentado, {
            where: {
                id: patrimonioMovimentado.id
            }
        }).then(response => {
            if(response) {
                MovimentacaoPatrimonio.create(data).then(response => {
                    res.status(200).json(response);
                });
            }

            if(!response) {
                res.status(200).json(false);
            }
        });
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var idPatrimonio = req.body.idPatrimonio;
    var idResponsavelAnterior = req.body.idResponsavelAnterior;
    var idResponsavelAtual = req.body.idResponsavelAtual;
    var idSetorAnterior = req.body.idSetorAnterior;
    var idSetorAtual = req.body.idSetorAtual;
    var idSituacaoAnterior = req.body.idSituacaoAnterior;
    var idSituacaoAtual = req.body.idSituacaoAtual;
    var dataMovimentacao = req.body.dataMovimentacao;

    var data = {
        idPatrimonio: idPatrimonio,
        idResponsavelAnterior: idResponsavelAnterior,
        idResponsavelAtual: idResponsavelAtual,
        idSetorAnterior: idSetorAnterior,
        idSetorAtual: idSetorAtual,
        idSituacaoAnterior: idSituacaoAnterior,
        idSituacaoAtual: idSituacaoAtual,
        dataMovimentacao: dataMovimentacao,
    };

    MovimentacaoPatrimonio.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    MovimentacaoPatrimonio.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
