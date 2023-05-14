'use strict'

const express = require('express');
const router = express.Router();
const statisticFunctions = require('../../server/functions/statistic.js');

router.get('/AverageWatchtimeAllMovies', (request, response) => {
    response.status(200).send({
        "average_watchtime": statisticFunctions.calcAverageWatchtimeAllMovies()
    });

});

router.get('/MedianWatchtimeAllMovies', (request, response) => {
    response.status(200).send({
        "median_watchtime": statisticFunctions.calcMedianWatchtimeAllMovies()
    });

});

router.get('/WatchtimeAllMoviesGenre', (request, response) => {
    const { genres } = request.body;
    if (typeof genres !== 'undefined' && Object.keys(request.body).length === 1) {
        response.status(200).send({
            "averages_by_genre": statisticFunctions.calcWatchtimeAllMoviesGenre(genres)
        });
    }
    response.status(400).send();

});

module.exports = router;