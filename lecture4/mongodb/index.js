require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

// CREATE
async function createUser(name, age) {
    const newUser = new User({ name, age });
    await newUser.save();
    console.log('Användare skapad:', newUser);
}

// READ
async function getAllUsers() {
    const users = await User.find();
    console.log('Alla användare:', users);
}

// UPDATE
async function updateUser(name, newAge) {
    const updated = await User.findOneAndUpdate(
        { name },
        { age: newAge },
        { new: true } // Returnera det uppdaterade dokumentet
    );
    console.log('Uppdaterad användare:', updated);
}

// DELETE
async function deleteUser(name) {
    const deleted = await User.findOneAndDelete({ name });
    console.log('Borttagen användare:', deleted);
}

async function main() {
    await mongoose.connect(`mongodb+srv://cluster71231.9p64t.mongodb.net`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Ansluten till MongoDB');

    await createUser('Bob', 25);
    await getAllUsers();
    await updateUser('Bob', 26);
    await deleteUser('Bob');
}

main().catch(err => console.error('Fel:', err));
