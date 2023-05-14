'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const server = express();

server.use(bodyParser.json());

server.get('/', (request, response) => {
    console.log('hey ich wurde aufgerufen');
    response.status(200).send('hey');
});

server.get('/query-parameter', (request, response) => {
    const { name } = request.query;
    response.status(200).send('Hi')
});

const accountRoutes = require('./routes/accounts');
server.use('/account', accountRoutes);

const movieRoutes = require('./routes/movie');
server.use('/movie', movieRoutes); 

const profileRoutes = require('./routes/profiles');
server.use('/profile', profileRoutes);

const statisticRoutes = require('./routes/statistic');
server.use('/statistic', statisticRoutes);

server.post('/login', (request, response) => {
    const { username, password } = request.body;
    response.status(200).send({
        username,
        password
    });
});

server.listen(port, () => {
    console.log(`server listenling on port ${port}`);
});