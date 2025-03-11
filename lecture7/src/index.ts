// src/index.ts
import express, {Express, NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import {Permission, ROLE_HIERARCHY} from "./roles";
import {Role} from "@prisma/client";
import {HttpStatus} from "./http-status";
import {UserWithoutPassword} from "./user";
import {RequestWithUser} from "./express-utils";
import {authorize} from "./middlewares/authorize-middleware";
import {authorizeWithHierarchy} from "./middlewares/authorize-with-hiarchy-middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use((req: any, _, next: NextFunction) => {
  req.user = {
    id: 'C8CE7D83-DE72-4A46-94A8-A4A7AC24839B',
    email: 'rasmus@julo.se',
    role: Role.ADMIN
  } satisfies UserWithoutPassword
  next();
});

// Skydda en rutt
app.post('/create', authorize(['create']), (req, res) => {
  res.send('Resurs skapad!');
});

app.get('/read', authorize(['read']), (req, res) => {
  res.send('Resurs läst!');
});

app.put('/update', authorize(['update']), (req, res) => {
  res.send('Resurs uppdaterad!');
});

app.delete('/delete', authorize(['delete']), (req, res) => {
  res.send('Resurs raderad!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
