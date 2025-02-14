## Backend Template

* Detta projekt använder sig av [Prisma](https://www.prisma.io) och [PostgreSQL](https://www.postgresql.org) för att skapa och interagera med databasen.

### Kom igång
* Installera alla dependencies: `npm install`
* Installera [Docker](https://www.docker.com/get-started)
* Installera [PostgreSQL](https://www.postgresql.org/download)
* Starta databasen lokalt: `npm run postgres:start-locally`
* Starta servern: `npm run dev`
* Kör migreringar (när ni har uppdaterat databasschemat): `npm run prisma:migrate`
