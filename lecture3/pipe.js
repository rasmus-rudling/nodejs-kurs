const fs = require('fs');

const readStream = fs.createReadStream('storFil.txt');
const writeStream = fs.createWriteStream('kopia.txt');

readStream.pipe(writeStream);

readStream.on('end', () => {
    console.log('Kopian är klar!');
});
