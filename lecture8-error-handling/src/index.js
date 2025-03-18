const express = require('express')

// Setup express
const app = express()
const port = 3000
app.use(express.json());

process.on('uncaughtException', (err) => {
    console.error('Ohanterat undantag:', err);
    // process.exit(1); // Avsluta processen
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Ohanterat Promise-rejection:', reason);
});

app.use((err, req, res, next) => {
    console.log("Hej")
    console.error(err.stack);
    res.status(500).send('Något gick fel!');
});

app.get('/data/:id', async (req, res) => {
    const id = req.params.id;

    if (id === '1') {
        throw new Error('Något gick fel');
    }

    return res.json({
        id: parseInt(id),
        name: 'Your data'
    });
});

app.post('/data', async (req, res) => {
    // 1. Lagra data
    // 2. Invalidera cache
})

app.listen(port, () => console.log(`Servern är igång på port ${port}`));
