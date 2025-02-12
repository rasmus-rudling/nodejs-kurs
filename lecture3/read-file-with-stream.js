const fs = require('fs');

const readStream = fs.createReadStream('storFil.txt', { encoding: 'utf8' });

let numberOfChunks = 0
const startTime = new Date()

readStream.on('data', (chunk) => {
    console.log('Tar emot chunk:', chunk);
    numberOfChunks++;
});

readStream.on('end', () => {
    const endTime = new Date()
    console.log('Antal chunks:', numberOfChunks);
    console.log('Filinläsning är slutförd.');
    
    const duration = endTime - startTime
    console.log('Tid:', duration, 'ms');
});

readStream.on('error', (err) => {
    console.error('Fel vid läsning:', err);
});
