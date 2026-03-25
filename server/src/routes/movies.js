const express=require('express');
const { getAllMovies, getMovieByid } = require('../controllers/movies');


const router=express.Router();

router.get('/', getAllMovies);
router.get('/:id',getMovieByid);

module.exports=router;