'use strict';

const databaseImport = require('../../../server/data/database.js');

const testUtils = require('../../test-utils');
const movieFunctions = require('../../../server/functions/movie.js');
const accFunctions = require('../../../server/functions/accounts.js');
const profFunctions = require('../../../server/functions/profile.js');
const printInfo = testUtils.printInfo;
const printSuccess = testUtils.printSuccess;
const printWarning = testUtils.printWarning;
const printError = testUtils.printError;

const testJSObjectData = JSON.parse(`[         {             "id": "Mdbb2d216fb5f6e8da3ee16aaf5197d97",             "title": "Alice in Wonderland",             "release": 1903,             "runtime": 108,             "cast": [                 "May Clark"             ],             "genres": [                 "Fantasy",                 "Silent"             ],             "extract": "Alice in Wonderland is a 1903 British silent fantasy film directed by Cecil Hepworth and Percy Stow. Only one copy of the original film is known to exist. The British Film Institute (BFI) partially restored the movie and its original film tinting and released it in 2010. According to BFI, the original film ran about 12 minutes; the restoration runs 9 minutes and 35 seconds. At the beginning of the restoration, it states that this is the first movie adaptation of Lewis Carroll's 1865 children's book Alice's Adventures in Wonderland. It was filmed mostly at Port Meadow in Oxford.",             "thumbnail": {                 "file": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Norman_Whitten_Mad_Hatter_1903.jpg/320px-Norman_Whitten_Mad_Hatter_1903.jpg",                 "width": 320,                 "height": 202             }         },         {             "id": "Mb5c2636cc1b071c210d7136d1cd9622f",             "title": "The Automobile Thieves",             "release": 1906,             "runtime": 11,             "cast": [                 "J. Stuart Blackton",                 "Florence Lawrence"             ],             "genres": [                 "Short",                 "Crime",                 "Drama",                 "Silent"             ],             "extract": "The Automobile Thieves is an American crime-drama silent film directed by J. Stuart Blackton. The picture stars Blackton and Florence Lawrence. It was released on November 10, 1906 by The American Vitagraph Company; a print of the feature is preserved in the UCLA Film and Television Archive.",             "thumbnail": {                 "file": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Advertisement_for_silent_film_The_Automobile_Thieves_in_newspaper%2C_The_New_York_Clipper.jpg/320px-Advertisement_for_silent_film_The_Automobile_Thieves_in_newspaper%2C_The_New_York_Clipper.jpg",                 "width": 320,                 "height": 496             }         }]`);

/**
 * Tests: getAllGenres
 */
function testGetAllGenres() {
  printInfo('Testing: getAllGenres1');
  function testCase1() {

    const result = movieFunctions.getAllGenres();
    if (Array.isArray(result) && (result.length === 0)) {
      return true;
    }
    return false;
  }

  function testCase2() {
    printInfo('Testing: getAllGenres2');
    const result = movieFunctions.getAllGenres(testJSObjectData);
    if (Array.isArray(result) && (result.length === 5)) {
      return true;
    }
    return false;
  }


  if (testCase1()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }

  if (testCase2()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
}

/**
 * Tests: getMoviesByPharse
 */
function testGetMoviesByPhrase() {
 
  function testCase1() {
    printInfo('Testing: testGetMoviesByPhrase1');
    const result = movieFunctions.findMoviesByPhrase();
    if (Array.isArray(result) && (result.length === 0)) {
      return true;
    }
    return false;
  }

  function testCase2() {
    printInfo('Testing: testGetMoviesByPhrase2');
    const result = movieFunctions.findMoviesByPhrase(testJSObjectData, "in");
    if (Array.isArray(result) && (result.length === 1)) {
      return true;
    }
    return false;
  }

  function testCase3() {
    printInfo('Testing: testGetMoviesByPhrase3');
    const result = movieFunctions.findMoviesByPhrase(testJSObjectData);
    if (Array.isArray(result) && (result.length === 0)) {
      return true;
    }
    return false;
  }

  function testCase4() {
    printInfo('Testing: testGetMoviesByPhrase4');
    const result = movieFunctions.findMoviesByPhrase("in");
    if (Array.isArray(result) && (result.length === 0)) {
      return true;
    }
    return false;
  }



  if (testCase1()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
  if (testCase2()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
  if (testCase3()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
  if (testCase4()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
}

/**
 * Tests: getMoviesByGenre
 */
function testGetMoviesByGenre() {
  
  function testCase1() {
    printInfo('Testing: testGetMoviesByGenre1');
    const result = movieFunctions.findMoviesByGenre(testJSObjectData, "Fantasy");
 
    if (Array.isArray(result) && (result.length === 1)) {
      return true;
    }
    return false;
  }

  function testCase2() {
    printInfo('Testing: testGetMoviesByGenre2');
    const result = movieFunctions.findMoviesByGenre(testJSObjectData);
    if (Array.isArray(result) && (result.length === 0)) {
      return true;
    }
    return false;

  }

  function testCase3() {
    printInfo('Testing: testGetMoviesByGenre3');
    const result = movieFunctions.findMoviesByGenre("FAntasy");
    if (Array.isArray(result) && (result.length === 0)) {
      return true;
    }
    return false;
  }
  function testCase4() {
    printInfo('Testing: testGetMoviesByGenre4');
    const result = movieFunctions.findMoviesByGenre();
    if (Array.isArray(result) && (result.length === 0)) {
      return true;
    }
    return false;
  }



  if (testCase1()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }

  if (testCase2()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
  if (testCase3()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
  if (testCase4()) {
    printSuccess(`Test: ... erfolgreich`);
  } else {
    printError(`Test: ... fehlgeschlagen`);
  }
}



// accFunctions.createAccount("Julian Aschenbrenner", "mail","password");
// profFunctions.createProfile("A128e22fe818704027430e80982acf5bb", "eric", "bla.jpg");
// profFunctions.createProfile("A0708f7d6bc8661b1b3e122c98170f0fc", "eric", "bla.jpg");

// console.log(typeof profFunctions.genreWatchtime("1"));

profFunctions.addBookmark("P6bd886a4430d840fd2bc0a9f0629ca67", "hfdzuiewhbijkfbewjk");

// profFunctions.changeProfilePicture(null, "test");


//accFunctions.createAccount(databaseImport.database.getAllAccounts(), "Eric Raabe", "mail","password");
//profFunctions.createProfile(databaseImport.database.getAllAccounts(),"A8d6cb465bde2d90f0f1b9ca8fb7ef072", "julanwacher", "picutes.png");

//profFunctions.deleteProfile(databaseImport.database.getAccount("A8d6cb465bde2d90f0f1b9ca8fb7ef072"),"P99ba5366804ce3ee277b11ec2098cd8a");
//accFunctions.deleteAccount(databaseImport.database.getAllAccounts(),"A422912b5a962358a7626f3ce4dd3dcd1");

//console.log(profFunctions.overallWatchtime(databaseImport.database.getAccount("A5e93571cc279166bbe77ddc2411ff668"), "Pdceeef1b202c8808b3ba6bb80fbcc4f4"));

//databaseImport.database.writeFile();


// TODO: implement two test-cases for each function: findMovieByPhrase, findMovieByGenre
//console.log(databaseImport.database.getMovie("Me41b0468f95a0de4d7fd00ff204257a3"));
// console.log(movieFunctions.findMovieByPhrase(databaseImport.database.getAllMovies(),"Source Code"))

testGetAllGenres();
testGetMoviesByPhrase();
testGetMoviesByGenre();
