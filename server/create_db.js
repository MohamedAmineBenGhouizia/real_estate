const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});

async function createDb() {
    try {
        await client.connect();
        await client.query('CREATE DATABASE real_estate_db');
        console.log('Database created successfully');
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

createDb();
