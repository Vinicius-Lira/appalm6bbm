'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const batalhao = require('./routes/obm-routes');
const hierarquia = require('./routes/hierarquia-routes');
const setor = require('./routes/setor-routes');
const pessoa = require('./routes/pessoa-routes');
const descargaPatrimonio = require('./routes/descargaPatrimonio-routes');
const grupoPatrimonio = require('./routes/grupoPatrimonio-routes');
const movimentacaoPatrimonio = require('./routes/movimentacaoPatrimonio-routes');
const situacaoPatrimonio = require('./routes/situacaoPatrimonio-routes');
const responsavelSetor = require('./routes/responsavelSetor-routes');
const permissao = require('./routes/permissao-routes');
const patrimonio = require('./routes/patrimonio-routes');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });


app.use('/', index);
app.use('/batalhao', batalhao);
app.use('/hierarquia', hierarquia);
app.use('/pessoa', pessoa);
app.use('/setor', setor);
app.use('/descargaPatrimonio', descargaPatrimonio);
app.use('/grupoPatrimonio', grupoPatrimonio);
app.use('/movimentacaoPatrimonio', movimentacaoPatrimonio);
app.use('/patrimonio', patrimonio);
app.use('/permissao', permissao);
app.use('/responsavelSetor', responsavelSetor);
app.use('/situacaoPatrimonio', situacaoPatrimonio);

module.exports = app;
