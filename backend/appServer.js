const express = require('express');
const port = 80;
const app = express();
const session = require('express-session');
const cors = require('cors')
const fileupload = require('express-fileupload');
const path = require('path');
const routes = require('./routes/routes')

// security
app.use(cors());

// Use routes (which houses the REST requests)
routes(app) 


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


//Data bridge
//TODO

