const bcrypt = require('bcrypt');

async function hashPassword(password, saltRounds) {
    return bcrypt.hash(password, saltRounds);
}

async function verifyPassword(inputPassword, storedHashedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
    if (isMatch) {
        console.log('Lösenordet matchar!');
    } else {
        console.log('Fel lösenord.');
    }
}
