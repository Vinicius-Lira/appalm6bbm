'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const teste = require('./routes/teste');

// const Teste = require('./models/teste');

const Funcoes = require('./models/Cadastro/Funcoes');
const Hierarquia = require('./models/Cadastro/Hierarquia');
const Local = require('./models/Cadastro/Local');
const Setor = require('./models/Cadastro/Setor');
const GrupoPatrimonio = require('./models/Cadastro/GrupoPatrimonio');
const Pessoa = require('./models/Cadastro/Pessoa');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/teste', teste);


module.exports = app;
