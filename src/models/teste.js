'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('testePonteon', 'cbm', 'cbm6bbmb4', {
    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate().then(function() {
    console.log("successo");
}).catch(function(erro) {
    console.log("error: " + erro);
});

const Teste = sequelize.define('testes', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

Teste.sync({force: true});
