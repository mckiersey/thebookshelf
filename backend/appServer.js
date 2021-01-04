const express = require('express');
const post = 80;
const app = express();
const session = require('express-session');
const cors = require('cors')
const fileupload = require('express-fileupload');
const path = require('path');

// security
app.use(cors());

//session
app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));

//start the server
const server = app.listen(port, (error) => {
    if(error) return
    console.log(`** SERVER ERROR: ${error}`);
    //server running
    console.log(`Server is running on port: ${server.address().port}`);

})

routes(app) // not sure what this does...

//Data bridge
//TODO

