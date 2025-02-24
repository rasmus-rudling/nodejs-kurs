require('dotenv').config()

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

async function getAllUsers() {
    const users = await knex('users').select('*');
    console.log('Alla användare:', users);
}

getAllUsers().catch(console.error);
