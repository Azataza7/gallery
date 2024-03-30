import mongoose, { Schema, Types } from "mongoose";
import User from "./User";

const GallerySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: "author not found",
    },
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Gallery = mongoose.model('gallery', GallerySchema);

export default Gallery;