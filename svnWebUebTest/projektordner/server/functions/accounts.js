'use strict';

const utils = require('../utils/utils.js');
const dbFunctions = require('../data/database.js');


/**
 * Legt einen neuen Account an.
 * 
 * @param { String } name the name of the new account
 * @param { String } mailAdress the mail address of the new account
 * @param { String } password the password of the new account
 */
function createAccount(name, mailAdress, password) {
    if (typeof name === 'string' && typeof mailAdress === 'string' && typeof password === 'string') {
        let newAccount = {
            id: utils.createId("A"),
            name: name,
            mail: mailAdress,
            password_hash: utils.createHash(password),
            payment: { type: "none" },
            profiles: []
        }

        dbFunctions.database.getAllAccounts().push(newAccount);
        dbFunctions.database.writeFile();
    }
}
/**
 * Löscht einen Account.
 * 
 * @param { String } accId The id of the account to be deleted
 * @returns 
 */
function deleteAccount(accId) {

    let found = false;
    let allAccounts = dbFunctions.database.getAllAccounts();

    allAccounts.forEach(account => {
        if (account.id === accId) {
            found = true;
            allAccounts.splice(allAccounts.indexOf(account), 1);
        }
    });

    dbFunctions.database.setAllAccounts(allAccounts);
    return found;
}
/**
 * Ändert die Payment-Type eines Accounts.
 * 
 * @param { String } accId The id of the account to be changed
 * @param { Payment Objekt } paymentType The new payment type of the account
 * @returns 
 */
function changePaymentType(accId, paymentType) {
    let account = dbFunctions.database.getAccount(accId);
    if(account !== null){
        account.payment = paymentType;
        dbFunctions.database.writeFile();
        return true;
    }
    return false;
}

module.exports = {
    createAccount: createAccount,
    deleteAccount: deleteAccount,
    changePaymentType: changePaymentType
}