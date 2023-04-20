const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('gestaolab', 'root', '', {
    host: 'localhost' || '127.0.0.1',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('conectado com sucesso');
}).catch(erro => { console.log(`Falha a se conectar ${erro}`) });

module.exports = sequelize;