const express = require('express');
const app = express();

app.use(express.json()); // Middleware för att tolka JSON i request body

// Logger middleware
app.use((req, res, next) => {
    console.log(`Metod: ${req.method}, URL: ${req.url}`);
    next();
});

// Valideringsmiddleware för POST-requests
app.post('/user', (req, res) => {
    const { name, email, age } = req.body;

    // Kontrollera om nödvändiga fält finns
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: "Namn är obligatoriskt och måste vara en sträng" });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Ogiltig e-postadress" });
    }
    if (!age || typeof age !== 'number' || age < 18) {
        return res.status(400).json({ error: "Ålder måste vara minst 18 och ett nummer" });
    }

    // Om allt är giltigt
    res.status(200).json({ message: "Användare validerad och registrerad", data: { name, email, age } });
});

// Starta servern
app.listen(3000, () => {
    console.log('Servern körs på port 3000');
});