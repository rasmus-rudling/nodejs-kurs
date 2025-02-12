const fsPromises = require('fs').promises;

console.log('1) Innan asynkron Promise-läsning');

let allInformation = '';

fsPromises.readFile('exempel1.txt', 'utf8')
    .then(data => {
        allInformation += data;
        console.log("[fil-1] All information:", allInformation);
    })
    .catch(err => {
        console.error('Fel vid filinläsning:', err);
    })
    .finally(() => {
        fsPromises.readFile('exempel2.txt', 'utf8')
            .then(data => {
                allInformation += data;
                console.log("[fil-2] All information:", allInformation);
            })
            .catch(err => {
                console.error('Fel vid filinläsning:', err);
            })
            .finally(() => {
                fsPromises.readFile('exempel2.txt', 'utf8')
                    .then(data => {
                        allInformation += data;
                        console.log("[fil-3] All information:", allInformation);
                    })
                    .catch(err => {
                        console.error('Fel vid filinläsning:', err);
                    })
                    .finally(() => {

                    })
            })
    })


console.log('3) Efter anrop av readFile med Promise');
