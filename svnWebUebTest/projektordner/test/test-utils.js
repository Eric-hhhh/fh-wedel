'use strict';

function printInfo(str) {
  console.log(`\x1b[37m ${str} \x1b[0m`);
}

function printSuccess(str) {
  console.log(`\t\x1b[32m [✓] ${str} \x1b[0m`);
}

function printWarning(str) {
  console.log(`\t\x1b[33m [⚠] ${str} \x1b[0m`);
}

function printError(str) {
  console.log(`\t\x1b[31m [x] ${str} \x1b[0m`);
}


module.exports = {
  printInfo: printInfo,
  printSuccess: printSuccess,
  printWarning: printWarning,
  printError: printError
}