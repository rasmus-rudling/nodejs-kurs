const fsPromises = require('fs').promises;

let allInformation = ''

const main = async () => {
    try {
        const data1 = await fsPromises.readFile('exempel1.txt', 'utf8');
        allInformation += data1;
        console.log('All information:', allInformation);
    } catch (e) {
        console.error('Fel vid filinläsning:', e);
    }

    try {
        const data2 = await fsPromises.readFile('exempel2.txt', 'utf8');
        allInformation += data2;
        console.log('All information:', allInformation);
    } catch (e) {
        console.error('Fel vid filinläsning:', e);
    }

    try {
        const data3 = await fsPromises.readFile('exempel3.txt', 'utf8');
        allInformation += data3;
        console.log('All information:', allInformation);
    } catch (e) {
        console.error('Fel vid filinläsning:', e);
    }

    console.log('All information:', allInformation);
}

main()
