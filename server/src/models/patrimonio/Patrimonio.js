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

const Patrimonio = sequelize.define('patrimonio', {
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vinculo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identificacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataEntrada: {
        type: Sequelize.DATE,
        allowNull: false
    },
    idResponsavel: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'pessoa'
            },
            key: 'id'
        }
    },
    idGrupo: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'grupopatrimonio'
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
    idSituacao: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'situacaopatrimonio'
            },
            key: 'id'
        }
    },
    valorEconomico: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    dataCarga: {
        type: Sequelize.DATE,
        allowNull: false
    },
    foto: {
        type: Sequelize.TEXT('medium'),
        allowNull: false
    },
    baixado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'patrimonio'
});

Patrimonio.addHook('beforeValidate', (patrimonio, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    patrimonio.updatedAt = data;
});

Patrimonio.sync({
    force: false
});

module.exports = Patrimonio;
