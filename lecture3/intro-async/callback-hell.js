const fs = require('fs');

console.log('1) Innan asynkron filinläsning');

let allInformation = ''

fs.readFile('exempel1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Fel vid filinläsning:', err);
        return;
    }
    allInformation += data

    fs.readFile('exempel2.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Fel vid filinläsning:', err);
            return;
        }
        allInformation += data

        fs.readFile('exempel3.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Fel vid filinläsning:', err);
                return;
            }
            allInformation += data
            console.log('4) All information:', allInformation);
        });
    });

    console.log('2) Filens innehåll:', data);
});

console.log('3) Efter anrop av readFile');
