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
var fileupload = require("express-fileupload");
const path = require('path'); 

 
// THIS BRANCH IS WORKING AND IS A BACKUP //

// Setting the view engine
app.set('views', path.join(__dirname, 'views'));  // add this one, change 'views' for your folder name if needed.
app.set('view engine', 'ejs');


//Fix security issues

app.use(cors());

// CREATE SESSION

app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));

app.use(fileupload({
    createParentPath: true
}));

app.use('/uploads', express.static('uploads'))

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


 

routes(app)

// BUILD DATA BRIDGE

const pool = require('./data/config');











