var knex = require('knex');
const database = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'gestaolab'
    }
});

module.exports = database;