'use strict';

const env = require('./../../config/env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION,
    dialectOptions: {
        useUTC: false,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
              return new Date(field.string() + 'Z');
            }
            return next()
        }
    },
    timezone: '-03:00'
});

sequelize.authenticate().then(function() {
    console.log("successo");
}).catch(function(erro) {
    console.log("error: " + erro);
});

const Contrato = sequelize.define('contrato', {
    numeroContrato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipoContrato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataHomologacao: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataVigencia: {
        type: Sequelize.DATE,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    situacao: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    valorContrato: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    valorConsumido: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    saldo: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'contrato'
});

Contrato.addHook('beforeValidate', (contrato, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    contrato.updatedAt = data;
});

Contrato.sync({
    force: false
});

module.exports = Contrato;
