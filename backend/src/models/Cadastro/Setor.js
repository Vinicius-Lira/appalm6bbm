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

const Setor = sequelize.define('setor', {
    setor: {
        type: Sequelize.STRING
    },
    descricao: {
        type: Sequelize.STRING
    },
    idLocal: {
        type: Sequelize.INTEGER,
        unique: false,
        references: {
            model: {
                tableName: 'locals'
            },
            key: 'id'
        }
    }
},
{
    engine: 'InnoDB'
},
{
    name: {
      singular: 'setor',
      plural: 'setores',
    },
 });

Setor.sync({force: false});
