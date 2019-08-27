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

const Pessoa = sequelize.define('pessoa', {
    usuario: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    idHierarquia: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'hierarquia'
            },
            key: 'id'
        }
    },
    idSetor: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'setors'
            },
            key: 'id'
        }
    },
    idFuncao: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'funcao'
            },
            key: 'id'
        }
    },
    telefone: {
        type: Sequelize.STRING(16)
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
},
{
    name: {
      singular: 'pessoa',
      plural: 'pessoas',
    },
 });

Pessoa.sync({force: false});
