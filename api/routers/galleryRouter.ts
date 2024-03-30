import { Router, Request, Response, NextFunction } from "express";
import Gallery from "../models/Gallery";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import { newGalleryData } from "../types";
import mongoose from "mongoose";

const galleryRouter = Router();

galleryRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Gallery.find();

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

galleryRouter.post('/', auth, imagesUpload.single('image'), 
async(req: RequestWithUser, res: Response, next: NextFunction) => { 
  const authorImage = req.file;
  const user = req.user;
  const { title } = req.body;

  if (!authorImage || !user) {
    return res.status(400).send({error: 'author or image got wrong'});
  }

  try {
    const newGallery: newGalleryData = {
      author: user._id,
      title: title,
      image: authorImage.filename,
    };

    const galleryItem = new Gallery(newGallery);
    await galleryItem.save();

    return res.status(201).send({ message: "gallery item created!", galleryItem });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default galleryRouter;
