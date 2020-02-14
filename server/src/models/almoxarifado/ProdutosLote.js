'use strict';

const env = require('./../../../config/env');

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

const ProdutosLote = sequelize.define('produtoslote', {
    idLote: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'lote'
            },
            key: 'id'
        }
    },
    idProduto: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'produto'
            },
            key: 'id'
        }
    },
    idPropriedadeProduto: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'propriedadeproduto'
            },
            key: 'id'
        }
    },
    qtdContratada: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    qtdRecebida: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    qtdRestante: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    valorUnitario: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'produtoslote'
});

ProdutosLote.addHook('beforeValidate', (produtoslote, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    produtoslote.updatedAt = data;
});

ProdutosLote.sync({
    force: false
});

module.exports = ProdutosLote;
