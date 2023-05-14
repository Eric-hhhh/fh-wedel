'use strict';



/**
 * Anhand einer übergebenen Filmliste werden alle vorkommenden Genres ermittelt und als Liste zurückgegeben.
 * Mehrfach vorkommende Genres werden nur einfach gezählt. 
 * @param { Movie[] } movies Filmliste, die analysiert werden soll
 * @return { String[] }  Array von Strings, die alle vorkommenden Genres darstellen
 */
function getAllGenres(movies) {
    let genres = [];
    if (Array.isArray(movies)) {
        movies.forEach(function (myMovie) {
            myMovie.genres.forEach(function (myGenre) {
                if (!genres.includes(myGenre)) {
                    genres.push(myGenre);
                }
            });
        });
    }
    return genres;
}

/**
 * Eine übergebene Filmliste wird anhand eines Suchkriteriums gefiltert.
 * Das Suchkriterium phrase muss im Titel unabhängig der Groß-/Kleinschreibung im Titel des Films vorkommen.
 * @param { Movie[] } movies Filmliste, die analysiert werden soll
 * @param { string } phrase  
 * @return { Movie[] } Liste von Filmen, die das Suchkriterium erfüllen
 */
function findMoviesByPhrase(movies, phrase) {

    let movieList = [];
    if (Array.isArray(movies) && typeof phrase === 'string') {
        movies.forEach(function (myMovie) {
            if (myMovie.title.toLowerCase().includes(phrase.toLowerCase())) {
                movieList.push(myMovie);
            }
        });
    }
    return movieList;
}


/**
 * Eine übergebene Filmliste wird anhand eines Suchkriteriums gefiltert.
 * Das Suchkriterium genre muss in der Genre-Liste unabhängig der Groß-/Kleinschreibung des Films vorkommen.
 * @param { Movie[] } movies Filmliste, die analysiert werden soll
 * @param { string } genre  
 * @return { Movie[] } Liste von Filmen, die das genre erfüllen
 */
function findMoviesByGenre(movies, genre) {
    let movieList = [];

    if (Array.isArray(movies) && typeof genre === 'string') {
        movies.forEach(function (myMovie) {
            myMovie.genres.forEach(element => {
                if (element.toLowerCase() === (genre.toLowerCase())) {
                    movieList.push(myMovie);
                }
            });

        });
    }
    return movieList;
}

async function getRating(movies, movieId) {

    // TODO: implement me, but later in exercise 1B oder auch nicht :-)
}


module.exports = {
    getAllGenres: getAllGenres,
    findMoviesByPhrase: findMoviesByPhrase,
    findMoviesByGenre: findMoviesByGenre
}