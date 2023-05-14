'use strict';

const fs = require('fs');
const movieFunctions = require('../functions/movie.js');

/**
 * Datenbankobjekt
 * bündelt Daten aller Filme, Accounts (inkl. Profile), Statistiken sowie die Plattform-Stammdaten
 * 
 */
class Database {

  /**
   * privates Feld, welches alle Daten enthält
   * entsprechende get-Methoden geben Filme, Accounts, Statistiken und Stammdaten weiter
   */
  #data;

  /**
   * öffentliches Feld, welches eine Liste aller Genres darstellt, die in den Filmen enthalten sind
   * dieses Attribut muss beim Auslesen einer Datendatei initialisiert werden
   */
  genres;

  // Konstruktor, wird beim Erzeugen eines konkreten Objekts aufgerufen
  constructor() {
    this.#openFile();
    this.parseGenres();
  }

  /**
   * private Methode, die eine Datendatei öffnet
   */
  #openFile() {
    this.#data = JSON.parse(fs.readFileSync('projektordner/server/data/database.json', { encoding: 'utf8' }));
  }

  /**
   * öffentliche Methode, die das private Datenfeld #data in eine json-Datei schreibt
   */
  writeFile() {
    const jsonString = JSON.stringify(this.#data, null, 4);
    fs.writeFileSync('projektordner/server/data/database.json', jsonString, { encoding: 'utf8' });
  }

  /**
   * liest die Filme aus und speichert alle vorkommenden Genres im Attribut genres
   * mehrfach vorkommende Genres werden nur einmal berücksichtigt
   */
  parseGenres() {
    this.genres = movieFunctions.getAllGenres(this.#data.movies);
  }

  /**
   * Get-Methode, die alle Filme ausliefert
   */
  getAllMovies() {
    return this.#data.movies;
  }

  /**
   * Get-Methode, die einen konkreten Film ausliefert
   * @param { string } movieId die Id des Films, der ausgeliefert werden soll
   */
  getMovie(movieId) {
    let foundMovie = null;
    if (typeof movieId === 'string') {
      this.#data.movies.forEach(movie => {
        if (movie.id === movieId) {
          foundMovie = movie;
          return foundMovie;
        }
      });
    }

    return foundMovie;
  }

  /**
   * Get-Methode, die alle Accounts ausliefert
   */
  getAllAccounts() {
    return this.#data.accounts;
  }
  /**
   * Get-Methode, die einen konkreten Account ausliefert
   * @param { string } accountId die Id des Accounts, der ausgeliefert werden soll
   */
  getAccount(accountId) {
    let foundAccount = null;
    if (typeof accountId === 'string') {
      this.#data.accounts.forEach(account => {
        if (account.id === accountId) {
          foundAccount = account;
        }
      });
    }
    return foundAccount;
  }



  /**
   * Get-Methode, die alle Profile ausliefert
   */
  getAllProfiles() {

    let allProfiles = [];
    const allAccounts = this.getAllAccounts();

    allAccounts.forEach(account => {
      allProfiles = allProfiles.concat(account.profiles);
    });

    return allProfiles;
  }

  /**
   * Get-Methode, die ein konkretes Profil ausliefert
   * @param { string } profileId die Id des Profils, das ausgeliefert werden soll
   */
  getProfile(profileId) {
    let foundProfile = null;

    if (typeof profileId === 'string') {
      this.getAllProfiles().forEach(profile => {
        if (profile.id === profileId) {
          foundProfile = profile;
        }
      });

    }
    return foundProfile;
  }

  getInfo() {
    return this.#data.info;
  }


  /**
   * Get-Methode, die alle Statistiken ausliefert
   */
  getAllStats() {
    return this.#data.statistics;
  }

  setAccount(accId, accountObject) {
    let changeAccount = this.getAccount(accId);
    changeAccount = accountObject;
    this.writeFile();
  }

  setAllAccounts(accounts) {
    this.#data.accounts = accounts;
    this.writeFile();
  }

  setProfile(accId, profileObject) {
    this.#data.accounts.forEach(account => {
      if (account.id === accId) {
        account.profiles.push(profileObject);
      }
    });

    this.writeFile();
  }

  // setAllProfiles(profiles) {
  //   this.data.profiles = profiles;
  //   this.writeFile();
  // }
}

// es wird eine Datenbankinstanz erzeugt...
const database = new Database();

module.exports = {
  // ...und wird für andere Module zugänglich
  database: database
}