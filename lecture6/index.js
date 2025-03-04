const dbUtils = require('./db-utils')

async function main() {
   const newUser = {
       "username": "rr97",
       "password": "Hej123!"
   }

   await dbUtils.saveNewUser(newUser.username, newUser.password)
}

main()