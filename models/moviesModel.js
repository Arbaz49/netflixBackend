import mongoose from "mongoose";

const movieSchema=new mongoose.Schema({

})

const MovieModel =new mongoose.model("Movie",movieSchema);
export default MovieModel;