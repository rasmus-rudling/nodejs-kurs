const fs = require('fs');

fs.writeFile('nyFil.txt', 'Detta är ett exempel', (err) => {
    if (err) {
        console.error('Fel vid skrivning:', err);
        return;
    }
    console.log('Texten skrevs till nyFil.txt');
});