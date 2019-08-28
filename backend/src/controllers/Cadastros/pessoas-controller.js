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
    conn.query("select * from pessoa where id = ?", [id], function(error, rows, field){
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
    conn.query("select * from pessoa", function(error, rows, field){
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

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
