'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const teste = require('./routes/teste');

const Teste = require('./models/teste');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/teste', teste);


module.exports = app;
