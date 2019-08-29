'use strict';

const env = require('../../../config/env');
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE
});

conn.connect(function(error) {
    if(!!error){
        console.log('Error');
    }else {
        console.log('Connected');
    }
});

exports.get = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    conn.query("select * from funcao where id= ?", [id], function(error, rows, field){
        if(!!error){
            console.log("Error in the query!");
        }else {
            console.log("Success!");
            console.log(rows);
            res.status(200).send({
                data: rows
            });
        }
    });
}

exports.getAll = (req, res, next) => {
    conn.query("select * from funcao", function(error, rows, field){
        if(!!error){
            console.log("Error in the query!");
        }else {
            console.log("Success!");
            console.log(rows);
            res.status(200).json({
                rows: rows,
                fields: getNomeColunas(field)
            });
        }
    });

    function getNomeColunas(fields) {
        var column = [];

        for(var counter = 0; counter < fields.length; counter++){
            column[counter] = fields[counter].name;
        }
        column = [
          {
            value: 'Avatar',
            align: 'left',
            sortable: false
          },
          {
            text: 'Name',
            value: 'Name',
            align: 'left',
            sortable: true
          },
          {
            text: 'User Name',
            value: 'Username',
            align: 'left',
            sortable: true
          },
          {
            text: 'Email',
            value: 'Email',
            align: 'left',
            sortable: true
          },
          {
            text: 'Phone',
            value: 'Phone',
            align: 'left',
            sortable: true
          },
          {
            text: 'Company',
            value: 'Company',
            align: 'left',
            sortable: true
          },
          {
            text: 'Website',
            value: 'Website',
            align: 'left',
            sortable: true
          }
      ];
        return column;
    }
}

exports.post = (req, res, next) => {
    const funcao = req.body.funcao;

    var data=new Date()
    var dia=data.getDate();
    var mes=data.getMonth();
    var ano=data.getFullYear();
    var hora= data.getHours();
    var minutos=data.getMinutes();
    var segundos=data.getSeconds();
    const dataAtual = ano + '-' + ((mes++) < 10 ? "0" + mes : mes) + '-' + dia + " " + hora +":"+(minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos );

    conn.query("insert into funcao(funcao, createdAt, updatedAt) values(?, ?, ?)", [funcao, dataAtual, dataAtual], function(error, rows, field){
        if(!!error){
            console.log("Error in the query!");
            res.status(201).send({
                data: false
            });
        }else {
            console.log("Success!");
            res.status(201).send({
                data: true
            });
        }
    });
};

exports.put = (req, res, next) => {
    const id = req.body.id;
    const funcao = req.body.funcao;


    conn.query("insert into funcao(funcao, createdAt, updatedAt) values(?, ?, ?)", [funcao, dataAtual, dataAtual], function(error, rows, field){
        if(!!error){
            console.log("Error in the query!");
            res.status(201).send({
                data: false
            });
        }else {
            console.log("Success!");
            res.status(201).send({
                data: true
            });
        }
    });

    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
