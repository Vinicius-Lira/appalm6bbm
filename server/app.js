'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./src/routes/index');
const batalhao = require('./src/routes/cadastros/obm-routes');
const hierarquia = require('./src/routes/cadastros/hierarquia-routes');
const setor = require('./src/routes/cadastros/setor-routes');
const pessoa = require('./src/routes/cadastros/pessoa-routes');
const grupoPatrimonio = require('./src/routes/cadastros/grupoPatrimonio-routes');

const responsavelSetor = require('./src/routes/cadastros/responsavelSetor-routes');
const permissao = require('./src/routes/cadastros/permissao-routes');


const patrimonio = require('./src/routes/patrimonio/patrimonio-routes');
const situacaoPatrimonio = require('./src/routes/patrimonio/situacaoPatrimonio-routes');
const descargaPatrimonio = require('./src/routes/patrimonio/descargaPatrimonio-routes');
const movimentacaoPatrimonio = require('./src/routes/patrimonio/movimentacaoPatrimonio-routes');

const login = require('./src/routes/login/login-routes');

const contrato = require('./src/routes/almoxarifado/contrato-routes');
const fornecedor = require('./src/routes/almoxarifado/fornecedor-routes');
const lote = require('./src/routes/almoxarifado/lote-routes');
const categoriaProduto = require('./src/routes/almoxarifado/categoriaProduto-routes');
const produto = require('./src/routes/almoxarifado/produto-routes');
const propriedadesProduto = require('./src/routes/almoxarifado/propriedadesProduto-routes');
const produtosLote = require('./src/routes/almoxarifado/produtosLote-routes');
const entrada = require('./src/routes/almoxarifado/entrada-routes');
const saida = require('./src/routes/almoxarifado/saida-routes');

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

//module.exports = app;

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const port = normalizePort(process.env.PORT || '3001');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privilesges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}