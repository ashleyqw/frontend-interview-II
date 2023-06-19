const credentials = {
    "development": {
        "host": "flashcards_database",
        "port": "5432",
        "user": "postgres",
        "password": "cashew",
        "database": "postgres"
    }
};

const pgp = require('pg-promise')();
const fs = require("fs");

const {host, port, database, password, user} = credentials['development'];

const db = pgp({ host, port, database, password, user, poolSize: 1 });

// Example of how to import this file in another file:
// const { db } = require('../adapters/postgres');
// Library documentation: https://github.com/vitaly-t/pg-promise
module.exports = {
    pgp, db
};
