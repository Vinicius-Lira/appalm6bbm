'use strict';
const Helpers = require("./../../helpers/helpers");
const DescargaPatrimonio = require('./../models/DescargaPatrimonio');
const Patrimonio = require('./../models/Patrimonio');
const SituacaoPatrimonio = require('./../models/SituacaoPatrimonio');
const Pessoa = require('./../models/Pessoa');

exports.get = (req, res, next) => {
    const id = req.params.id;
    DescargaPatrimonio.findAll().then(response => {
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
        var patrimonios = JSON.parse(JSON.stringify(response));
        Pessoa.findAll().then(response => {
            var pessoas = JSON.parse(JSON.stringify(response));
            DescargaPatrimonio.findAll().then(response => {
                var descargaPatrimonios = JSON.parse(JSON.stringify(response));
                var count = 0;

                for(count in descargaPatrimonios){
                    var countPatrimonio = 0;
                    for(countPatrimonio in patrimonios) {
                        if(patrimonios[countPatrimonio].id == descargaPatrimonios[count].idPatrimonio) {
                            descargaPatrimonios[count].codigo = patrimonios[countPatrimonio].codigo;
                        }
                    }
                    var countPessoa = 0;
                    for(countPessoa in pessoas) {
                        if(pessoas[countPessoa].id == descargaPatrimonios[count].idUltimoResponsavel) {
                            descargaPatrimonios[count].ultimoResponsavel = pessoas[countPessoa].nome;
                            break;
                        }
                    }

                    var countPessoa = 0;
                    for(countPessoa in pessoas) {
                        if(pessoas[countPessoa].id == descargaPatrimonios[count].idResponsavelRecebimento) {
                            descargaPatrimonios[count].responsavelRecebimento = pessoas[countPessoa].nome;
                            break;
                        }
                    }

                    descargaPatrimonios[count].dataBaixa = descargaPatrimonios[count].dataBaixa.split('T')[0].split("-").reverse().join('/');
                }

                res.status(200).json(descargaPatrimonios);
            });


        });
    });
}

exports.post = (req, res, next) => {
    var idPatrimonio = req.body.idPatrimonio;
    var idUltimoResponsavel = req.body.idUltimoResponsavel;
    var idResponsavelRecebimento = req.body.idResponsavelRecebimento;
    var idSetor = req.body.idSetor;
    var observacoes = req.body.observacoes;
    var dataBaixa = req.body.dataBaixa;

    var data = {
        idPatrimonio: idPatrimonio,
        idUltimoResponsavel: idUltimoResponsavel,
        idResponsavelRecebimento: idResponsavelRecebimento,
        idSetor: idSetor,
        observacoes: observacoes,
        dataBaixa: dataBaixa,
        createdAt: Helpers.getDataHoraAtual()
    };
    Patrimonio.findAll().then(response => {
        var patrimonios = JSON.parse(JSON.stringify(response));
        SituacaoPatrimonio.findAll().then(response => {
            var situacoesPatrimonio = JSON.parse(JSON.stringify(response));
            var count = 0;
            var posicaoSituacao = null;
            for(count in situacoesPatrimonio) {
                if(situacoesPatrimonio[count].situacao.toUpperCase().localeCompare("BAIXADO") == 0) {
                    posicaoSituacao = count;
                    break;
                }
            }
            count = 0;
            var patrimonio = {};
            for(count in patrimonios) {
                if(patrimonios[count].id == idPatrimonio) {
                    patrimonio = JSON.parse(JSON.stringify(patrimonios[count]));
                    patrimonio.idSituacao = situacoesPatrimonio[posicaoSituacao].id;
                    patrimonio.baixado = true;
                    data.idUltimoResponsavel = patrimonio.idResponsavel;
                    data.idSetor = patrimonio.idSetor;
                    break;
                }
            }
            console.log(JSON.parse(JSON.stringify(patrimonio)));
            Patrimonio.update(patrimonio, {
                where: {
                    id: patrimonio.id
                }
            }).then(response => {
                DescargaPatrimonio.create(data).then(response => {
                    res.status(200).json(response);
                });
            });

        });
    });
    
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var idPatrimonio = req.body.idPatrimonio;
    var idUltimoResponsavel = req.body.idUltimoResponsavel;
    var idResponsavelRecebimento = req.body.idUltimoResponsavel;
    var idSetor = req.body.idSetor;
    var observacoes = req.body.observacoes;
    var dataBaixa = req.body.dataBaixa;

    var data = {
        idPatrimonio: idPatrimonio,
        idUltimoResponsavel: idUltimoResponsavel,
        idResponsavelRecebimento: idResponsavelRecebimento,
        idSetor: idSetor,
        observacoes: observacoes,
        dataBaixa: dataBaixa
    };

    DescargaPatrimonio.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    DescargaPatrimonio.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
