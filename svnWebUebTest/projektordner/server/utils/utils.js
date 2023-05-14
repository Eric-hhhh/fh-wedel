// Modul für kryptographische Methoden
const crypto = require('crypto');

/**
 * Funktion wandelt eine übergebene Zeichenkette in einen Hashwert um.
 * @param {*} str übergebene Zeichenkette
 * @returns Hashwert als Zeichenkette
 */
function createHash(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

/**
 * Funktion erzeugt einen zufällig erzeugten Hashwert,
 * der als ID verwendet werden kann.
 * Benötigt die Funktion "createHash"
 * @param prefix [String] Präfix, der vor die ID vorangestellt werden soll
 * @returns erzeugte ID, ggf. mit übergebenem Präfix
 */
function createId(prefix) {
  const randomStr = `${Date.now() + Math.random()}`;
  const hash = createHash(randomStr);
  return prefix != null ? `${prefix}${hash}` : hash;
}

module.exports = {
  createHash: createHash,
  createId: createId
}