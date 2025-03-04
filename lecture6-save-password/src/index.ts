// src/index.ts
import express, {Express, NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import {User} from "@prisma/client";
import {CreateUser, UserCredentials} from "./user.interface";
import {UserRepository} from "./user-repository";
import {HttpStatus} from "./http-utils";
import {UserService} from "./user-service";
import {AuthUtils} from "./auth-utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const userService = new UserService()
const authUtils = new AuthUtils()
app.use(express.json());

app.post("/user", async (req: Request, res: Response) => {
    const user = req.body as CreateUser
    const savedUser = await userService.save(user)
    res.status(HttpStatus.CREATED).json({id: savedUser.id})
});

app.post("/login", async (req: Request, res: Response) => {
    const credentials = req.body as UserCredentials
    const jwt = await userService.login(credentials)

    if (!jwt) {
        const msg = `Could not log in user with email ${credentials.email}`
        console.log(msg)
        res.status(HttpStatus.NOT_AUTHENTICATED).json({msg})
        return
    }

    res.status(HttpStatus.OK).json({jwt})
});

const authenticateToken = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(HttpStatus.NOT_AUTHENTICATED).send('Ingen token skickades.');
    const userEmail = await authUtils.isTokenValid(token)

    if (!userEmail) {
        return res.status(HttpStatus.NOT_AUTHENTICATED).send('Token är inte giltig');
    }

    req.user = userEmail

    next()
}

app.get("/user/:email", authenticateToken, async (req: any, res: Response) => {
    const userEmailFromToken = req.user
    const userInfoToGet = req.params['email']

    // Authorization
    if (userEmailFromToken !== userInfoToGet) {
        res.status(HttpStatus.NOT_AUTHORIZED).send(`${userEmailFromToken} is not allowed to get info about ${userInfoToGet}`)
        return
    }

    const userInfo = await userService.findOneByEmail(userInfoToGet)

    if (!userInfo) {
        res.status(HttpStatus.NOT_FOUND).send(`Kunde inte hitta någon information om ${userInfoToGet}`)
        return
    }

    res.status(HttpStatus.OK).json(userInfo)
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
