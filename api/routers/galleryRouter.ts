import { Router, Request, Response, NextFunction } from "express";
import Gallery from "../models/Gallery";

const galleryRouter = Router();

galleryRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Gallery.find();

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

export default galleryRouter;
