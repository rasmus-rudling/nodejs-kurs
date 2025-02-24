import express, {Express} from "express";
import dotenv from "dotenv";
import bikeStoreRoutes from './bike-store-routes';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use('/bike-stores', bikeStoreRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
