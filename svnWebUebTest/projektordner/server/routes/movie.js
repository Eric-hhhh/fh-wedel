'use strict'

const express = require('express');
const router = express.Router();
const db = require('../../server/data/database.js');
const movieFunctions = require('../../server/functions/movie.js');

router.get('/allGenres/', (request, response) => {
    const { movies } = request.body;
    if (typeof movies !== 'undefined' && Object.keys(request.body).length === 1) {
        response.status(200).send({
            genres: movieFunctions.getAllGenres(movies)
        });
    } else {
        response.status(400).send();
    }

});


/**
 * make a get request with a query parameter 
 *      "phrase" or "genre"
 * have to put a movie list in a "movies" object in the body
 */
router.get('/', (request, response) => {
    const { phrase, genre } = request.query;
    const { movies } = request.body;
    if (typeof phrase !== 'undefined' && Object.keys(request.query).length === 1 &&
        typeof movies !== 'undefined' && Object.keys(request.body).length === 1) {
        response.status(200).send({
            "movies": movieFunctions.findMoviesByPhrase(movies, phrase)
        });

    } else if (typeof genre !== 'undefined' && Object.keys(request.query).length === 1 &&
        typeof movies !== 'undefined' && Object.keys(request.body).length === 1) {
        response.status(200).send({
            "movies": movieFunctions.findMoviesByGenre(movies, genre)
        });
    } else {
        response.status(400).send();
    }

});


module.exports = router;