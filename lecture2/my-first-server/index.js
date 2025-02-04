const express = require('express')
const uuid = require("uuid")
const app = express()
app.use(express.json());
const port = 3000

const HttpStatus = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

// TODO: Det kommer en POST /user request ni ska validera
// 1. Kolla om datan är giltig
//    a. Om datan är giltig --> gå vidare
//    b. Om datan inte är giltig --> Kasta rätt fel till klienten

app.use((req, res, next) => {
    console.log(`Metod: ${req.method}, URL: ${req.url}`);
    next(); // Gå vidare till nästa steg i kedjan
});

let allUsers = []

// interface User {
//     name: string
//     age: number
// }

app.post("/user", (req, res) => {
    const userData = req.body
    allUsers.push({
        id: uuid.v4(),
        ...userData
    })
    res.status(HttpStatus.CREATED)
    res.end()
})

app.delete("/user/:id", (req, res) => {
    const idOfUserToDelete = req.params.id
    const filteredUsers = allUsers.filter(user => user.id !== idOfUserToDelete)

    if (filteredUsers.length === allUsers.length) {
        res.status(HttpStatus.NOT_FOUND).send(`Couldn't find user with id "${idOfUserToDelete}"`)
    }
    allUsers = filteredUsers

    res.status(HttpStatus.ACCEPTED).send("Användaren borttagen.")
})

app.get('/user', (req, res) => {
    return res.send(allUsers)
})

app.use((req, res) => {
    res.status(HttpStatus.NOT_FOUND).send('Sidan saknas.');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
