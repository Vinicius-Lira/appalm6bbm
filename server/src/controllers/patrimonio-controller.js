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
    var patrimonio = {
        id: "",
        codigo: "",
        vinculo: "",
        identificacao: "",
        descricao: "",
        observacoes: "",
        dataEntrada: "",
        idResponsavel: "",
        responsavelNome: "",
        idGrupo: "",
        grupo: "",
        idSetor: "",
        setor: "",
        idSituacao: "",
        situacao: "",
        valorEconomico: "",
        dataCarga: "",
        foto: "",
        baixado: "",
    };

    var patrimonioDefault = {
        id: "",
        codigo: "",
        vinculo: "",
        identificacao: "",
        descricao: "",
        observacoes: "",
        dataEntrada: "",
        idResponsavel: "",
        responsavelNome: "",
        idGrupo: "",
        grupo: "",
        idSetor: "",
        setor: "",
        idSituacao: "",
        situacao: "",
        valorEconomico: "",
        dataCarga: "",
        foto: "",
        baixado: "",
    };

    var patrimonios = [];

    Patrimonio.findAll().then(response => {
        var patrimoniosFind = response;
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
                            patrimonio.id = patrimoniosFind[i].id;
                            patrimonio.codigo = patrimoniosFind[i].codigo;
                            patrimonio.vinculo = patrimoniosFind[i].vinculo;
                            patrimonio.identificacao = patrimoniosFind[i].identificacao;
                            patrimonio.descricao = patrimoniosFind[i].descricao;
                            patrimonio.observacoes = patrimoniosFind[i].observacoes;
                            patrimonio.dataEntrada = Helpers.formatDate(patrimoniosFind[i].dataEntrada);
                            patrimonio.idResponsavel = patrimoniosFind[i].idResponsavel;
                            patrimonio.idGrupo =  patrimoniosFind[i].idGrupo;
                            patrimonio.idSetor = patrimoniosFind[i].idSetor;
                            patrimonio.idSituacao = patrimoniosFind[i].idSituacao;
                            patrimonio.valorEconomico = patrimoniosFind[i].valorEconomico;
                            patrimonio.dataCarga = Helpers.formatDate(patrimoniosFind[i].dataCarga);
                            patrimonio.foto = patrimoniosFind[i].foto;
                            patrimonio.baixado = patrimoniosFind[i].baixado;

                            for(k in gruposPatrimonio) {
                                if(gruposPatrimonio[k].id == patrimonio.idGrupo){
                                    patrimonio.grupo = gruposPatrimonio[k].grupo;
                                    break;
                                }
                            }
                            k = 0;
                            for(k in setores) {
                                if(setores[k].id == patrimonio.idSetor) {
                                    patrimonio.setor = setores[k].setor;
                                    break;
                                }
                            }
                            k = 0;
                            for(k in situacaoPatrimonio) {
                                if(situacaoPatrimonio[k].id == patrimonio.idSituacao) {
                                    patrimonio.situacao = situacaoPatrimonio[k].situacao;
                                    break;
                                }
                            }
                            k = 0;
                            for(k in pessoas) {
                                if(pessoas[k].id == patrimonio.idResponsavel) {
                                    patrimonio.responsavelNome = pessoas[k].nome;
                                    break;
                                }
                            }
                            console.log(patrimonio.id);
                            patrimonios.push(patrimonio);
                            patrimonio = patrimonioDefault;
                        }

                        res.status(200).json(patrimonios);
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
