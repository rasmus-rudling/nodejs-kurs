const fsPromises = require('fs').promises;

let allInformation = ''

const main = async () => {
    const allFiles = ['exempel1.txt', 'exempel2.txt', 'exempel3.txt'];

    try {
        // Promise.all kommer att vänta på att alla promises är klara
        const allData = await Promise.all(allFiles.map(file => fsPromises.readFile(file, 'utf8')))

        for (const data of allData) {
            allInformation += data;
        }

        console.log('All information:', allInformation);
    } catch (e) {
        console.error('Fel vid filinläsning:', e);
    }
}

main()
