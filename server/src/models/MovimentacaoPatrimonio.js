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

const MovimentacaoPatrimonio = sequelize.define('movimentacaopatrimonio', {
    idPatrimonio: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'patrimonio'
            },
            key: 'id'
        }
    },
    idResponsavelAnterior: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'pessoa'
            },
            key: 'id'
        }
    },
    idResponsavelAtual: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'pessoa'
            },
            key: 'id'
        }
    },
    idSetorAnterior: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'setor'
            },
            key: 'id'
        }
    },
    idSetorAtual: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'setor'
            },
            key: 'id'
        }
    },
    idSituacaoAnterior: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'situacaopatrimonio'
            },
            key: 'id'
        }
    },
    idSituacaoAtual: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'situacaopatrimonio'
            },
            key: 'id'
        }
    },
    dataMovimentacao: {
        type: Sequelize.DATE,
        allowNull: false
    },
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'movimentacaopatrimonio'
});

MovimentacaoPatrimonio.addHook('beforeValidate', (movimentacaopatrimonio, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    movimentacaopatrimonio.updatedAt = data;
});

MovimentacaoPatrimonio.sync({
    force: false
});

module.exports = MovimentacaoPatrimonio;
