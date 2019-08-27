'use strict';

const env = require('../../../config/env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION
});

sequelize.authenticate().then(function() {
    console.log("successo");
}).catch(function(erro) {
    console.log("error: " + erro);
});

const Local = sequelize.define('local', {
    local: {
        type: Sequelize.STRING
    },
    descricao: {
        type: Sequelize.STRING
    }
});

Local.sync({force: false});
