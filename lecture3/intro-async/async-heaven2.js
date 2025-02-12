const fsPromises = require('fs').promises;

let allInformation = ''

const main = async () => {
    const allFiles = ['exempel1.txt', 'exempel2.txt', 'exempel3.txt'];

    try {
        // Promise.all kommer att vänta på att alla promises är klara
        const [data1, data2, data3] = await Promise.all([
            fsPromises.readFile(allFiles[0], 'utf8'),
            fsPromises.readFile(allFiles[1], 'utf8'),
            fsPromises.readFile(allFiles[2], 'utf8')
        ])

        allInformation += data1;
        allInformation += data2;
        allInformation += data3;

        console.log('All information:', allInformation);
    } catch (e) {
        console.error('Fel vid filinläsning:', e);
    }
}

main()
