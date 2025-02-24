require('dotenv').config()
const {Client} = require('pg');

async function connectAndQuery() {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    await client.connect();

    // Exempel på att lägga till data (INSERT)
    await client.query(
        'INSERT INTO users(name, age) VALUES ($1, $2)',
        ['Alice', 30]
    );

    await client.query(
        'INSERT INTO users(name, age) VALUES ($1, $2)',
        ['Rasmus', 27]
    );

    // Exempel på att läsa data (SELECT)
    const allUsers = await client.query('SELECT * FROM users');
    console.log('Alla användare:', allUsers.rows);

    // Exempel på att uppdatera data (UPDATE)
    await client.query(
        'UPDATE users SET age = $1 WHERE name = $2',
        [31, 'Alice']
    );


    // Exempel på att radera data (DELETE)
    await client.query(
        'DELETE FROM users WHERE name = $1',
        ['Alice']
    );

    // Exempel på att läsa data (SELECT)
    const allUsersAgaing = await client.query('SELECT * FROM users');
    console.log('Alla användare:', allUsersAgaing.rows);

    await client.end();
}

connectAndQuery().catch(err => {
    console.error('Fel vid anslutning eller frågekörning:', err);
});
