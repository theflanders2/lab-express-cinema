// Define all the routes related to the Movie model
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie.model.js'); // <== add this line before the routes

// GET route to retrieve and display all the movies
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(allMoviesFromDb => {
      // -> allMoviesFromDb is a placeholder, it can be any word
      console.log('Retrieved movies from database:', allMoviesFromDb);
   
      res.render('movies/movies.hbs', { movies: allMoviesFromDb });
    })
    .catch(error => {
      console.log('Error while getting the movies from the database: ', error);
   
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get('/movies/:movieId', (req, res) => {
  const movieId = req.params.movieId;

  Movie.findOne({_id: movieId})
    .then(foundMovie => {
      console.log('foundMovie', foundMovie);
      res.render('movies/movie-details.hbs', foundMovie)
    })
    .catch(err => console.log(err))
})

module.exports = router;