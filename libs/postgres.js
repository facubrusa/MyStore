const { Client } = require('pg');

async function getConnection() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'facu',
        password: '20Nexo20',
        database: 'my_store'
    });
    await client.connect();
    return client;
}

module.exports = getConnection;
