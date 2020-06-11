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

const DescargaPatrimonio = sequelize.define('descargapatrimonio', {
    idPatrimonio: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'patrimonio'
            },
            key: 'id'
        }
    },
    idUltimoResponsavel: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'pessoa'
            },
            key: 'id'
        }
    },
    idResponsavelRecebimento: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'pessoa'
            },
            key: 'id'
        }
    },
    idSetor: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'setor'
            },
            key: 'id'
        }
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataBaixa: {
        type: Sequelize.DATE,
        allowNull: false
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'descargapatrimonio'
});

DescargaPatrimonio.addHook('beforeValidate', (descargapatrimonio, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    descargapatrimonio.updatedAt = data;
});

DescargaPatrimonio.sync({
    force: false
});

module.exports = DescargaPatrimonio;
