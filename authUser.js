const database = require('./database');

async function findUser(username) {
    const [rows] = await database('usuarios').where('username', [username]).select('username');
    if (rows.length > 0)
        return rows[0];
    else return null;
}

async function findUserById(id) {
    const [rows] = await database('usuarios').where('id', [id]).select('id');
    if (rows.length > 0)
        return rows[0];
    else return null;
}

module.exports = { findUser, findUserById }