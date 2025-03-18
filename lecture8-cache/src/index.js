const redis = require('redis');
const express = require('express')
const {getDataFromDatabase} = require("./db");

// Setup express
const app = express()
const port = 3000
app.use(express.json());
app.listen(port, () => console.log(`Servern är igång på port ${port}`));

// Setup redis
const client = redis.createClient();
client.on('error', (err) => console.error('Redis-fel:', err));
client.connect();
client.on('connect', () => console.error("Redis startad"));

app.get('/data', async (req, res) => {
    const cacheKey = 'dataKey';

    try {
        // Kontrollera om data redan finns i cache
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // Om inget finns i cache, hämta data från databasen
        console.log('Hämtar data från databasen...');
        const data = await getDataFromDatabase();
        console.log(data)

        // Lagra data i cache med en tidsbegränsning (t.ex. 60 sekunder)
        await client.setEx(cacheKey, 60, JSON.stringify(data));

        res.json(data);
    } catch (err) {
        res.status(500).send('Ett fel uppstod.');
    }
});

app.post('/data', async (req, res) => {
    // 1. Lagra data
    // 2. Invalidera cache
})