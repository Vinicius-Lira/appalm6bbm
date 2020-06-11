'use strict';

require('dotenv').config();

const { DB_CONNECTION, DB_HOST, DB_POST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_CONNECTION,
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
    cadastrosCadastrar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    cadastrosEditar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    cadastrosApagar: {
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
    patrimonioApagar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioMovimentar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioMovimentarEditar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioMovimentarApagar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioDescarregar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioDescarregarEditar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    patrimonioDescarregarApagar: {
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
