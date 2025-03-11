import {Request, Response} from "express";

export const createBlogPost = (req: Request, res: Response) => {
  res.send('Resurs skapad!');
};

export const readBlogPost = (req: Request, res: Response) => {
  res.send('Resurs läst!');
};

export const updateBlogPost = (req: Request, res: Response) => {
  res.send('Resurs uppdaterad!');
};

export const deleteBlogPost = (req: Request, res: Response) => {
  res.send('Resurs raderad!');
};
