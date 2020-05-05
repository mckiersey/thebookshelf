// 20191027: Build a server which is capable of displaying all user names and
// also has a login function.
// https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-set-up-the-server--cms-31698

//Build a server with HTTP Module

// REQUIRE PACKAGES AND SET THE PORT

const express = require('express');
const port = 5555;
const app = express();
var session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
var cors = require('cors');

 
// THIS BRANCH IS WORKING AND IS A BACKUP //

//Fix security issues

app.use(cors())

// CREATE SESSION

app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));

//USE BODY PARSER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

//START THE SERVER

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Sean, the server is listening on post ${server.address().port}`);
});


// FIRST GET

routes(app)

// BUILD DATA BRIDGE

const pool = require('./data/config');





// GET ALL DATA
app.get('/all_data', (request, response) => {
    pool.query('SELECT * FROM accounts', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});


// Add a new user

app.post('/users', (request, response) => {
    pool.query('INSERT INTO accounts SET ?', request.body, (error, result) => {
        if (error) throw error;

        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// SEND LIST OF USER NAMES

app.get('/usernames', (request, response) => {
    pool.query('SELECT username FROM accounts', (error, result) => {
        if (error) throw error;

        return response.send({ result });
    });
});


// SIGN IN AUTHENTIFICATION

app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        pool.query('SELECT * FROM accounts WHERE username = ? AND password = ?',
            [username, password], function (error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('http://63.33.214.25/home.html');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }
                response.end();
            });
           } else {
    response.send('Please enter Username and Password!');
    response.end();

    };

});



