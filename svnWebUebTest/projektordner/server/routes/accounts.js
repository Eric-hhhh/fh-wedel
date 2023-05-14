'use strict'

const express = require('express');
const router = express.Router();
const db = require('../../server/data/database.js');
const accountFunctions = require('../../server/functions/accounts.js');

router.get('/', (request, response) => {

    const { account_id } = request.query;
    if (typeof account_id !== 'undefined' && Object.keys(request.query).length === 1) {
        let account = db.database.getAccount(account_id);
        if (account !== null) {
            response.status(200).send({
                "account": account
            });
        } else {
            response.status(404).send({
                message: "No Account under this ID"
            });
        }
    }
    response.status(400).send();
});



router.put('/', (request, response) => {
    const { name, mail, password } = request.body;
    if (typeof name !== 'undefined' &&
        typeof mail !== 'undefined' &&
        typeof password !== 'undefined' && Object.keys(request.body).length === 3) {
        accountFunctions.createAccount(name, mail, password);
        response.status(200).send();
    } else {
        response.status(400).send({
            "message": "Bad Request for create Account"
        });
    }

});

router.delete('/', (request, response) => {
    const { account_id } = request.query;
    if (typeof account_id !== 'undefined' && Object.keys(request.query).length === 1) {
        let code = 200;
        if (!accountFunctions.deleteAccount(account_id)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});


router.post('/changePayment', (request, response) => {
    const { account_id, type, paypal_mail, credit_cart } = request.body;

    let code = 200;
    let obj = {};
    if (typeof account_id !== 'undefined' && typeof type !== 'undefined' && Object.keys(request.query).length <= 4) {
        if (type === 'none' && Object.keys(request.query).length === 2) {
            obj["type"] = type;
        } else if (type === 'paypal' && typeof paypal_mail !== 'undefined' && Object.keys(request.query).length === 3) {
            obj["type"] = type;
            obj["paypal_mail"] = paypal_mail;
        } else if (type === 'credit_card' && typeof credit_cart !== 'undefined' && Object.keys(request.query).length === 3) {
            obj["type"] = type;
            obj["credit_card"] = credit_cart;
        }

        if (!accountFunctions.changePaymentType(account_id, obj)) {
            code = 404;
        }
        response.status(code).send();
    } else {
        response.status(400).send();
    }
});

module.exports = router;