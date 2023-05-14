'use strict';
const utils = require('../utils/utils.js');
const dbFunctions = require('../data/database.js');
const movieFunctions = require('../functions/movie.js');
const e = require('express');
const { text } = require('body-parser');

/**
 * Legt ein neues Profil in einem Account an 
 * 
 * @param {String} accId Die Id von dem accouint in dem das Profil angelegt wird
 * @param {String} name Der Name von dem neuen Profil
 * @param {String} image Das Profilbild von dem Profil 
 */
function createProfile(accId, name, image) {
    let account = dbFunctions.database.getAccount(accId);

    if (typeof account !== 'undefined' && account !== null) {
        const newProfile = {
            id: utils.createId("P"),
            name: name,
            picture: image,
            statistics: {
                total_watchtime: 0,
                watchtime_by_genre: {},
                likes: [],
                likes_by_genre: {}
            },
            history: [],
            bookmarks: []
        };

        account.profiles.push(newProfile);
        dbFunctions.database.writeFile();
        return true;
    }
    return false;
}
/**
 * Ändert das Profilbild
 * @param {*} profileId Die Id von dem Profil
 * @param {*} newImage Das neue Bild
 */
function changeProfilePicture(profileId, newImage) {
    let profile = dbFunctions.database.getProfile(profileId);
    let status = false;
    if (typeof profile !== 'undefined' && profile !== null) {
        profile.picture = newImage;
        dbFunctions.database.writeFile();
        status = true;
    }
    return status;
}
/**
 * Löscht ein Profil 
 * @param {*} profileId Die Id von dem zulöschendem Profil 
 */
function deleteProfile(profileId) {
    let allAccounts = dbFunctions.database.getAllAccounts();
    let status = false;
    if (typeof allAccounts !== 'undefined' && allAccounts !== null && typeof profileId === 'string') {
        allAccounts.forEach(account => {
            account.profiles.forEach(profile => {
                if (profile.id === profileId) {
                    account.profiles.splice(account.profiles.indexOf(profile), 1);
                    status = true;
                }
            });
        });
        dbFunctions.database.writeFile();
    }
    return status;
}


/**
 * Gets the OverallWatchtime of the profile
 * @param {*} profileId The id of the profile
 * @returns the OverallWatchtime of the profile
 */
function getOverallWatchtime(profileId) {
    let profile = dbFunctions.database.getProfile(profileId);
    if (typeof profile !== 'undefined' && profile !== null) {
        let watchtime = profile.statistics.total_watchtime;
        if (typeof watchtime === 'number') {
            return watchtime;
        }
    }

    return 0;
}



/**
 * Gets the genre WatchTime 
 * @param {*} profileId The ID of the profile
 * @returns the WatchTime of the profile per genre
 */
function genreWatchtime(profileId) {
    let profile = dbFunctions.database.getProfile(profileId);
    if (typeof profile !== 'undefined' && profile !== null) {
        let watchtime = profile.statistics.watchtime_by_genre;
        if (typeof watchtime === 'object' && watchtime !== null && typeof watchtime !== 'undefined') {
            return watchtime;
        }
    }
    return {};
}

/**
 * Es gibt eine Funktion zum Hinzufügen von Filmen zu einer Merkliste. Hier sind die Parameter Profil-ID und Film-ID notwendig. 
 * Analog dazu kann mit einer Funktion mit gleichen Parametern ein Film von einer Merkliste entfernt werden.
 */
function addBookmark(profileId, movieId) {
    let status = false;
    if (typeof profileId === 'string' && typeof movieId === 'string') {
        let profile = dbFunctions.database.getProfile(profileId);
        if (profile !== null && typeof profile !== 'undefined' && profile.bookmarks.indexOf(movieId) === -1) {
            profile.bookmarks.push(movieId);
            dbFunctions.database.writeFile();
            status = true;
        }
    }
    return status;
}

/**
 * Deletes a Bookmark from the database
 * @param {*} account 
 * @param {*} profileId 
 * @param {*} movieId 
 */
function removeBookmark(profileId, movieId) {
    if (typeof profileId === 'string' && typeof movieId === 'string') {
        let profile = dbFunctions.database.getProfile(profileId);
        if (profile !== null && typeof profile !== 'undefined') {
            profile.bookmarks.forEach(function (bookmark) {
                if (bookmark === movieId) {
                    profile.bookmarks.splice(profile.bookmarks.indexOf(bookmark), 1);
                    dbFunctions.database.writeFile();

                }
            });
        }
    }
    return true; //TODO FIXME 
}
/**
 * Die Funktion, die den Profil-Verlauf ergänzt, erhält drei Parameter: Profil-ID, Film-ID und ein numerischer Wert, der einen Zeitstempel repräsentiert. 
 */
function updateProfileHistory(profileId, movieId, timeStamp) {
    let profile = dbFunctions.database.getProfile(profileId);
    let status = false;
    if (profile !== null && typeof profile !== 'undefined') {
        let nh = {
            "id": movieId,
            "last_timestamp": new Number(timeStamp)
        };
        profile.history.push(nh);
        profile.statistics.total_watchtime = new Number(profile.statistics.total_watchtime) + new Number(timeStamp);

        let movieGenre = dbFunctions.database.getMovie(movieId).genres[0];

        if (typeof profile.statistics.watchtime_by_genre[movieGenre] === 'undefined') {
            profile.statistics.watchtime_by_genre[movieGenre] = new Number(0);
        }
        profile.statistics.watchtime_by_genre[movieGenre] =  new Number(profile.statistics.watchtime_by_genre[movieGenre]) + new Number(timeStamp);

        dbFunctions.database.writeFile();
        status = true;

    }
    return status;
}

/**
 * Es gibt eine Funktion zum Hinzufügen von Filmen zu einer "Gefällt mir"-Liste. Hier sind die Parameter Profil-ID und Film-ID notwendig. 
 * Analog dazu kann mit einer Funktion mit gleichen Parametern ein Film von dieser Liste entfernt werden.
 */
function addFavorite(profileId, movieId) {
    let profile = dbFunctions.database.getProfile(profileId);
    let status = false;
    if (profile !== null && typeof profile !== 'undefined') {
        if (profile.statistics.likes.indexOf(movieId) === -1) {
            profile.statistics.likes.push(movieId);
            profile.statistics.likes_by_genre = groupLikes(profile.statistics.likes);
            if (typeof dbFunctions.database.getAllStats().likes[movieId] === 'undefined') {
                dbFunctions.database.getAllStats().likes[movieId] = new Number(0);
            }
            dbFunctions.database.getAllStats().likes[movieId]++;

            dbFunctions.database.writeFile();
        }
        status = true;

    }
    return status
}
function removeFavorite(profileId, movieId) {
    let profile = dbFunctions.database.getProfile(profileId);
    if (profile !== null && typeof profile !== 'undefined') {
        let index = profile.statistics.likes.indexOf(movieId);
        if (index !== -1) {
            profile.statistics.likes.splice(index, 1);
            profile.statistics.likes_by_genre = groupLikes(profile.statistics.likes);


            if (dbFunctions.database.getAllStats().likes[movieId] === 1) {
                delete dbFunctions.database.getAllStats().likes[movieId];
            } else {
                dbFunctions.database.getAllStats().likes[movieId] -= 1;
            }

            dbFunctions.database.writeFile();
        }
        return true;
    }
    return false;
}
/**
 * Ferner gibt es ein Attribut, welches die "Likes" nach Genres gruppiert. Bei jedem Aufruf einer der beiden eben vorgestellten Funktionen, 
 * wird diese Gruppierung aktualisiert.
 * 
 * @param { Movie[] } likes List of movies that are like from a profile
 * @returns Object with the genre : nummer of movies(likes)
 */
function groupLikes(likes) {
    let movies = [];
    let gerneSet = new Set();
    likes.forEach(like => {
        let movie = dbFunctions.database.getMovie(like);
        movies.push(movie);
        gerneSet.add(movie.genres[0]);
    });

    let obj = {};
    gerneSet.forEach(function (genre) {
        obj[genre] = 0;
    });

    movies.forEach(movie => {
        obj[movie.genres[0]] += 1;
    });

    return obj;
}




module.exports = {
    createProfile,
    changeProfilePicture,
    deleteProfile,
    getOverallWatchtime,
    genreWatchtime,
    addBookmark,
    removeBookmark,
    addFavorite,
    removeFavorite,
    updateProfileHistory
}


//createProfile("A128e22fe818704027430e80982acf5bb", "eric nummer 2", "bla.imaibr");
//addFavorite("P29a5218db1534b0f291d5d5e10e12844", "M370e1f2dc5084f39bbd7bc542d876661");
//addBookmark("P29a5218db1534b0f291d5d5e10e12844", "M370e1f2dc5084f39bbd7bc542d876661");
//addFavorite("Pdceeef1b202c8808b3ba6bb80fbcc4f4", "M84044543efe563e290080e88be538f7e");
//console.log(genreWatchtime("P29a5218db1534b0f291d5d5e10e12844"));