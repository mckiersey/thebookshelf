const mysql = require('mysql');

// Configure credentials to connect to the database
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'auth'
};

// Creating a pool to enable multiple connections
const pool = mysql.createPool(config);

//Export the pool
module.exports = pool;
