import {Router} from "express";
import {createBlogPost, deleteBlogPost, readBlogPost, updateBlogPost} from "./blog-posts-controller";
import {authorize} from "../../middlewares/authorize-middleware";
import {authorizeBlogPostOwner} from "../../middlewares/authorize-blog-post-owner";

const router = Router()
// router.post("/", authorize(['create']), createBlogPost);
// router.get("/", authorize(['read']), readBlogPost);
// router.patch("/", authorize(['update']), updateBlogPost);
// router.delete("/", authorize(['delete']), deleteBlogPost);

router.post("/", authorize(['create']), createBlogPost);
// router.get("/", authorize(['read']), readAllBlogPost);
router.get("/:id", authorize(['read']), readBlogPost);
router.patch("/:id", authorizeBlogPostOwner, updateBlogPost);
router.delete("/:id", authorizeBlogPostOwner, deleteBlogPost);

export default router
