import { Router, Request, Response, NextFunction } from "express";
import Gallery from "../models/Gallery";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import { newGalleryData } from "../types";
import mongoose from "mongoose";
import permit from "../middleware/permit";

const galleryRouter = Router();

galleryRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Gallery.find().populate('user', '_id email displayName role token');

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

galleryRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    try {
      const results = await Gallery.find({ user: userId }).populate(
        "user",
        "_id email displayName role token"
      );

      return res.send(results);
    } catch (e) {
      next(e);
    }
  }
);

galleryRouter.get('/my-gallery', 
auth, 
async(req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const results = await Gallery.find({ user: req.user?._id })
    .populate('user', '_id email displayName role token');

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

galleryRouter.delete(
  "/my-gallery/:id",
  auth,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const galleryId = req.params.id;

      const galleryItem = await Gallery.findById(galleryId);

      if (!galleryItem || !userId) {
        return res.status(404).send({error: 'gallery or user not found'});
      }

      if (galleryItem.user.toString() !== userId.toString()) {
        return res.status(403).send({ error: "Unauthorized action." });
      }

      const deletedGalleryItem = await Gallery.findByIdAndDelete(galleryId);

      if (!deletedGalleryItem) {
        return res
          .status(404)
          .send({ error: "Photo not found or already deleted." });
      }

      return res.send({ message: "success", deletedGalleryItem });
    } catch (e) {
      next(e);
    }
  }
);

galleryRouter.post('/', 
auth, 
imagesUpload.single('image'), 
async(req: RequestWithUser, res: Response, next: NextFunction) => { 
  const authorImage = req.file;
  const user = req.user;
  const { title } = req.body;

  if (!authorImage || !user) {
    return res.status(400).send({error: 'author or image got wrong'});
  }

  try {
    const newGallery: newGalleryData = {
      user: user._id,
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

galleryRouter.delete("/:id",
  auth,
  permit("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const galleryId = req.params.id;

      const deletedGalleryItem = await Gallery.findByIdAndDelete(galleryId);

      if (!deletedGalleryItem) {
        return res
          .status(404)
          .send({ error: "Photo not found or already deleted." });
      }

      return res.send({ message: "success", deletedGalleryItem});
    } catch (e) {
      next(e);
    }
  }
);

export default galleryRouter;
