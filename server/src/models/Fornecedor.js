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

const Fornecedor = sequelize.define('fornecedor', {
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    representante: {
        type: Sequelize.STRING,
        allowNull: false
    },
    razaoSocial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeFantasia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: true
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefoneFixo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefoneCelular: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'fornecedor'
});

Fornecedor.addHook('beforeValidate', (fornecedor, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    fornecedor.updatedAt = data;
});

Fornecedor.sync({
    force: false
});

module.exports = Fornecedor;
