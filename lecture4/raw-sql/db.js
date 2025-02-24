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
    // En enkel fråga: hämta serverns tidsstämpel
    const result = await client.query(`SELECT NOW() AS current_time`);
    console.log('Serverns tid:', result.rows[0].current_time);

    await client.end();
}

connectAndQuery().catch(err => {
    console.error('Fel vid anslutning eller frågekörning:', err);
});
