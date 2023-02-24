import MovieModel from "../models/moviesModel.js";
import catchErrorAsync from "../utils/catchErrorAsync.js";


//get all the movies
const getMovies=catchErrorAsync(async(req,res,next)=>{
const movies = await MovieModel.find();
res.status(200).json({
    message:"success",
    data: movies
})
})


//add new movies
const addMovie=catchErrorAsync(async(req,res,next)=>{
    const movies = await MovieModel.create(req.body);
    res.status(200).json({
        message:"success",
        data: movies
    })
    })

    



export {getMovies,addMovie}