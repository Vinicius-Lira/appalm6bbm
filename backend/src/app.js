'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const funcaoRoutes = require('./routes/cadastro/funcao-routes');
const grupoPatrimonioRoutes = require('./routes/cadastro/gruposPatrimonio-routes');
const hierarquiaRoutes = require('./routes/cadastro/hierarquia-routes');
const localRoutes = require('./routes/cadastro/local-routes');
const pessoaRoutes = require('./routes/cadastro/pessoa-routes');
const setorRoutes = require('./routes/cadastro/setor-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

app.use('/', index);
app.use('/funcao', funcaoRoutes);
app.use('/grupospatrimonio', grupoPatrimonioRoutes);
app.use('/hierarquia', hierarquiaRoutes);
app.use('/local', localRoutes);
app.use('/pessoa', pessoaRoutes);
app.use('/setor', setorRoutes);

module.exports = app;
