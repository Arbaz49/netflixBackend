import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  imgTitle: {
    type: String,
  },
  imgSm: {
    type: String,
  },
  trailer: {
    type: String,
  },
  video: {
    type: String,
  },
  year: {
    type: String,
  },
  limit: {
    type: Number,
  },
  genre: {
    type: String,
  },
  isSeries: {
    type: Boolean,
  },
});

const MovieModel = new mongoose.model("Movie", movieSchema);
export default MovieModel;
