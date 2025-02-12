const fsPromises = require('fs').promises;

const startTime = new Date()

const main = async () => {
    try {
        const fileData = await fsPromises.readFile('storFil.txt', 'utf8');
        const endTime = new Date()
        const duration = endTime - startTime
        console.log('All information:', fileData);
        console.log('Duration:', duration, 'ms');
    } catch (e) {
        console.error('Fel vid filinläsning:', e);
    }
}

main()
