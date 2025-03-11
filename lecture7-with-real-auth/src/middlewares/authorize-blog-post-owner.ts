import {NextFunction, Response} from "express";
import {Role} from "@prisma/client";
import {HttpStatus} from "../utils/http-status";
import {CustomJwtPayload} from "../domain/user/user.interface";
import {BlogPostsService} from "../domain/blog-posts/blog-posts-service";

const blogPostService = new BlogPostsService()

export async function authorizeBlogPostOwner(req: any, res: Response, next: NextFunction) {
  const postId = req.params.id
  const {userEmail, role} = req.jwtPayload as CustomJwtPayload

  if (role === Role.ADMIN) next()

  const {creator: {email: creatorEmail}} = await blogPostService.findOne(postId)

  if (creatorEmail === userEmail) next()

  res.status(HttpStatus.NOT_AUTHORIZED).send(`Användare med email ${userEmail} har inte tillgång till blogginlägg med id ${postId}`)
}