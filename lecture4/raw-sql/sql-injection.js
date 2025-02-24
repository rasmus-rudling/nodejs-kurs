const {Client} = require('pg');

async function connectAndQuery() {
    const client = new Client({
        user: 'admin',
        host: 'localhost',
        database: 'raw-db',
        password: 'admin',
        port: 5432,
    });

    await client.connect();
    // En enkel fråga: hämta serverns tidsstämpel
    // const result = await client.query(`SELECT NOW() AS current_time`);
    const id = '467F99E3-A6D1-4448-9A74-1DDAE4D2C70E; DROP TABLE users;';
    const sqlInjectionDanger = await client.query(`SELECT * FROM users WHERE id = ${id};`);
    console.log('Serverns tid:', result.rows[0].current_time);

    await client.end();
}

connectAndQuery().catch(err => {
    console.error('Fel vid anslutning eller frågekörning:', err);
});
