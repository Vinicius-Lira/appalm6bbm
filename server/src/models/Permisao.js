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

const Permissao = sequelize.define('permissao', {
    idResponsavel: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'pessoa'
            },
            key: 'id'
        }
    },
    cadastrar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioCadastrar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioEditar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioMovimentar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioDescarregar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'permissao'
});

Permissao.addHook('beforeValidate', (permissao, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    permissao.updatedAt = data;
});

Permissao.sync({
    force: false
});

module.exports = Permissao;
