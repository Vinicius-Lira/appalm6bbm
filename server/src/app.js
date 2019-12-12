'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const batalhao = require('./routes/obm-routes');
const contrato = require('./routes/contrato-routes');
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
const login = require('./routes/login-routes');
const fornecedor = require('./routes/fornecedor-routes');
const lote = require('./routes/lote-routes');
const categoriaProduto = require('./routes/categoriaProduto-routes');
const produto = require('./routes/produto-routes');
const propriedadesProduto = require('./routes/propriedadesProduto-routes');
const produtosLote = require('./routes/produtosLote-routes');
const entrada = require('./routes/entrada-routes');
const saida = require('./routes/saida-routes');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.set('view engine', 'html');
app.use(express.static('./public'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

var redirectHome = function (req, res, next) {
    if(req.originalUrl.indexOf("/api/") < 0) {
        res.redirect('/');
    }

    next();
}

app.use(redirectHome);

app.use('/', index);
app.use('/api/batalhao', batalhao);
app.use('/api/contrato', contrato);
app.use('/api/hierarquia', hierarquia);
app.use('/api/login', login);
app.use('/api/fornecedor', fornecedor);
app.use('/api/lote', lote);
app.use('/api/pessoa', pessoa);
app.use('/api/setor', setor);
app.use('/api/descargaPatrimonio', descargaPatrimonio);
app.use('/api/grupoPatrimonio', grupoPatrimonio);
app.use('/api/movimentacaoPatrimonio', movimentacaoPatrimonio);
app.use('/api/patrimonio', patrimonio);
app.use('/api/permissao', permissao);
app.use('/api/responsavelSetor', responsavelSetor);
app.use('/api/situacaoPatrimonio', situacaoPatrimonio);
app.use('/api/categoriaProduto', categoriaProduto);
app.use('/api/produto', produto);
app.use('/api/propriedadesProduto', propriedadesProduto);
app.use('/api/produtosLote', produtosLote);
app.use('/api/entrada', entrada);
app.use('/api/saida', saida);

module.exports = app;
