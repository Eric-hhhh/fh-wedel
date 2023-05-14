'use strict';
const dbFunctions = require('../data/database.js');

/**
 * Disclaimer: im Folgenden wird von "Gesamtdauer" gesprochen, gemeint ist die "Gesamt"zuschau"dauer der gesehenen Filme", was im Englischen sich in etwa als "watchtime" übersetzen lässt.

Alle Funktionen, die die Gesamt-Statistik berechnen, benötigen als ersten Parameter die Liste aller Filme. Die Funktionen, die nach Genre gruppieren benötigen zudem als weiteren Parameter die Liste aller Genre.

Der Rückgabewert der Funktion, die alle Filme zusammenfasst repräsentiert einen numerischen Wert.

Der Rückgabewert der Funktion, die die Filme gruppiert nach Genre zusammenfasst, repräsentiert einen Record, wobei die Schlüssel die Genrebezeichnungen und die Werte die Berechnungsergebnisse entsprechen.
Arithmetisches Mittel

Das arithmetische Mittel ergibt sich, wenn die Gesamtdauer alle Filme durch die Anzahl der Filme dividiert wird.
Median

Der Median ergibt sich wie folgt: Die Filmliste wird anhand der Gesamtdauer sortiert. Der Film, der "in der Mitte liegt" (ggf. ermittelten Indexwert runden), gibt mit seiner Gesamtdauer den Median vor.
 */



function calcAverageWatchtimeAllMovies() {

    const profiles = dbFunctions.database.getAllProfiles();
    let length = 0;
    let totalRuntime = 0;
    profiles.forEach(profile => {
        profile.history.forEach(obj => {
            totalRuntime += obj.last_timestamp;
            length++;
        });
    });
    // dbFunctions.database.getAllStats().average_watchtime = totalRuntime / movieList.length;
    // dbFunctions.database.writeFile();

    return totalRuntime / length;
}

function calcMedianWatchtimeAllMovies() {
    const profiles = dbFunctions.database.getAllProfiles();
    let list = [];
    profiles.forEach(profile => {
        profile.history.forEach(obj => {
            list.push(obj.last_timestamp);
        });
    });

    let sortedList = list.sort((a, b) => a - b);

    let erg = null;

    if (sortedList.length % 2 === 0) {
        erg = sortedList[sortedList.length / 2];
    } else {
        erg = sortedList[(sortedList.length - 1) / 2];
    }
    // dbFunctions.database.getAllStats().median_watchtime = erg;
    // dbFunctions.database.writeFile();
    return erg;
}

function calcWatchtimeAllMoviesGenre(genres) {
    const profiles = dbFunctions.database.getAllProfiles();
    let obj = {};
    genres.forEach(genre => {
        let runtime = 0;
        let liste = [];
        profiles.forEach(profile => {
            profile.history.forEach(pair => {
                if (dbFunctions.database.getMovie(pair.id).genres[0] === genre) {
                    runtime += pair.last_timestamp;
                    liste.push(pair.last_timestamp);
                }
            });
        });
        liste = liste.sort((a, b) => a - b);
        if (runtime !== 0) {
            obj[genre] = {
                "average": runtime / liste.length,
                "median": liste[liste.length % 2 === 0 ? liste.length / 2 : (liste.length - 1) / 2]
            };
        }

    });
    // dbFunctions.database.getAllStats().averages_by_genre = obj;
    // dbFunctions.database.writeFile();
    return obj;

}


module.exports = {
    calcAverageWatchtimeAllMovies,
    calcMedianWatchtimeAllMovies,
    calcWatchtimeAllMoviesGenre
}