import express, {Express} from "express";
import dotenv from "dotenv";
import userRoutes from "./domain/user/user-routes";
import blogPostsRoutes from "./domain/blog-posts/blog-posts-routes";
import {extractUserFromToken} from "./middlewares/extract-user-from-token-middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(extractUserFromToken)
app.use('/users', userRoutes);
app.use('/blog-posts', blogPostsRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
