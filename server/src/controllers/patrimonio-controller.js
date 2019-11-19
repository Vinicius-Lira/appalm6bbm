'use strict';
const Helpers = require("./../../helpers/helpers");
const Patrimonio = require('./../models/Patrimonio');
const GrupoPatrimonio = require('./../models/GrupoPatrimonio');
const Setor = require('./../models/Setor');
const SituacaoPatrimonio = require('./../models/SituacaoPatrimonio');
const Pessoa = require('./../models/Pessoa');

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
        var patrimoniosFind = JSON.parse(JSON.stringify(response));
        GrupoPatrimonio.findAll().then(response => {
            var gruposPatrimonio = response;
            Setor.findAll().then(response => {
                var setores = response;
                SituacaoPatrimonio.findAll().then(response => {
                    var situacaoPatrimonio = response;
                    Pessoa.findAll().then(response => {
                        var pessoas = response;
                        var i = 0, k = 0;
                        for(i in patrimoniosFind){
                            patrimoniosFind[i].dataEntrada = Helpers.formatDate(patrimoniosFind[i].dataEntrada);
                            patrimoniosFind[i].dataCarga = Helpers.formatDate(patrimoniosFind[i].dataCarga);

                            for(k in gruposPatrimonio) {
                                if(gruposPatrimonio[k].id == patrimoniosFind[i].idGrupo){
                                    patrimoniosFind[i].grupo = gruposPatrimonio[k].grupo;
                                    break;
                                }
                            }
                            k = 0;
                            for(k in setores) {
                                if(setores[k].id == patrimoniosFind[i].idSetor) {
                                    patrimoniosFind[i].setor = setores[k].setor;
                                    break;
                                }
                            }
                            k = 0;
                            for(k in situacaoPatrimonio) {
                                if(situacaoPatrimonio[k].id == patrimoniosFind[i].idSituacao) {
                                    patrimoniosFind[i].situacao = situacaoPatrimonio[k].situacao;
                                    break;
                                }
                            }
                            k = 0;
                            for(k in pessoas) {
                                if(pessoas[k].id == patrimoniosFind[i].idResponsavel) {
                                    patrimoniosFind[i].responsavelNome = pessoas[k].nome;
                                    break;
                                }
                            }
                        }
                        res.status(200).json(patrimoniosFind);
                    });
                });

            });
        });

    });
}

exports.post = (req, res, next) => {
    var codigo = req.body.codigo;
    var vinculo = req.body.vinculo;
    var identificacao = req.body.identificacao;
    var descricao = req.body.descricao;
    var observacoes = req.body.observacoes;
    var dataEntrada = req.body.dataEntrada.split("/").reverse().join("-");
    var idResponsavel = req.body.idResponsavel;
    var idGrupo = req.body.idGrupo;
    var idSetor = req.body.idSetor;
    var idSituacao = req.body.idSituacao;
    var valorEconomico = req.body.valorEconomico;
    var dataCarga = req.body.dataCarga.split("/").reverse().join("-");
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
    var dataEntrada = req.body.dataEntrada.split("/").reverse().join("-");
    var idResponsavel = req.body.idResponsavel;
    var idGrupo = req.body.idGrupo;
    var idSetor = req.body.idSetor;
    var idSituacao = req.body.idSituacao;
    var valorEconomico = req.body.valorEconomico;
    var dataCarga = req.body.dataCarga.split("/").reverse().join("-");
    var foto = req.body.foto;
    var baixado = req.body.baixado;

    console.log(dataEntrada);

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
