'use strict'

const express = require('express');
const router = express.Router();
const db = require('../../server/data/database.js');
const movieFunctions = require('../../server/functions/movie.js');
const profileFunctions = require('../../server/functions/profile.js');

router.put('/', (request, response) => {
    const { account_id, name, image } = request.body;
    if (typeof account_id !== 'undefined' &&
        typeof name !== 'undefined' &&
        typeof image !== 'undefined' && Object.keys(request.body).length === 3) {
        let code = 200;
        if (!profileFunctions.createProfile(account_id, name, image)) {
            code = 404
        }
        response.status(code).send();
    } else {
        response.status(400).send({
            "message": "Bad Request for create Profile"
        });
    }
});



router.get('/', (request, response) => {
    const { profile_id } = request.query;
    if (typeof profile_id !== 'undefined' && Object.keys(request.query).length === 1) {
        let code = 200;
        let prof = db.database.getProfile(profile_id);
        if (prof === null) {
            response.status(400).send();
        } else {
            response.status(200).send({
                profile: prof
            });
        }
    } else {
        response.status(400).send();
    }
});


router.delete('/', (request, response) => {
    const { profile_id } = request.query;
    if (typeof profile_id !== 'undefined' && Object.keys(request.query).length === 1) {
        let code = 200;
        if (!profileFunctions.deleteProfile(profile_id)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});



router.put('/bookmark', (request, response) => {
    const { profile_id, movie_id } = request.query;
    if (typeof movie_id !== 'undefined' && typeof profile_id !== 'undefined' && Object.keys(request.query).length === 2) {
        let code = 200;
        if (!profileFunctions.addBookmark(profile_id, movie_id)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});

router.delete('/bookmark', (request, response) => {
    const { profile_id, movie_id } = request.query;
    if (typeof movie_id !== 'undefined' && typeof profile_id !== 'undefined' && Object.keys(request.query).length === 2) {
        let code = 200;
        if (!profileFunctions.removeBookmark(profile_id, movie_id)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});

router.put('/favorite', (request, response) => {
    const { profile_id, movie_id } = request.query;
    if (typeof movie_id !== 'undefined' && typeof profile_id !== 'undefined' && Object.keys(request.query).length === 2) {
        let code = 200;
        if (!profileFunctions.addFavorite(profile_id, movie_id)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});

router.delete('/favorite', (request, response) => {
    const { profile_id, movie_id } = request.query;
    if (typeof movie_id !== 'undefined' && typeof profile_id !== 'undefined' && Object.keys(request.query).length === 2) {
        let code = 200;
        if (!profileFunctions.removeFavorite(profile_id, movie_id)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});

router.post('/', (request, response) => {
    const { profile_id, image } = request.query;
    if (typeof image !== 'undefined' && typeof profile_id !== 'undefined' && Object.keys(request.query).length === 2) {
        let code = 200;
        if (!profileFunctions.changeProfilePicture(profile_id, image)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});

router.get('/overallwatchtime', (request, response) => {
    const { profile_id } = request.query;
    if (typeof profile_id !== 'undefined' && Object.keys(request.query).length === 1) {
        response.status(200).send({
            overallWatchtime: profileFunctions.getOverallWatchtime(profile_id)
        });
    } else {
        response.status(400).send();
    }
});

router.get('/genreWatchtime', (request, response) => {
    const { profile_id } = request.query;
    if (typeof profile_id !== 'undefined' && Object.keys(request.query).length === 1) {
        response.status(200).send({
            genreWatchtime: profileFunctions.genreWatchtime(profile_id)
        });
    } else {
        response.status(400).send();
    }
});


router.post('/history', (request, response) => {
    const { profile_id, movie_id, timestamp } = request.query;
    if (typeof profile_id !== 'undefined' && typeof movie_id !== 'undefined' && typeof movie_id !== 'undefined' && Object.keys(request.query).length === 3) {
        let code = 200;
        if (!profileFunctions.updateProfileHistory(profile_id, movie_id, timestamp)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});


module.exports = router;