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

const Produto = sequelize.define('produto', {
    codigoBarras: {
        type: Sequelize.STRING,
        allowNull: true
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: true
    },
    unidadeMedida: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qtdEstoque: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    qtdMinima: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false
    },
    idCategoriaProduto: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'categoriaproduto'
            },
            key: 'id'
        }
    },
    localizacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    armario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: Sequelize.TEXT('medium'),
        allowNull: false
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'produto'
});

Produto.addHook('beforeValidate', (produto, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    produto.updatedAt = data;
});

Produto.sync({
    force: false
});

module.exports = Produto;
