const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const routes = require('./routes.js');
const bodyParser = require('body-parser')
process.env.PWD = process.cwd()




// Add body parser for routes.js file
app.use(bodyParser.json())
app.use(express.static(process.env.PWD + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));



//start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`** SERVER ERROR: ${error}`);

    console.log(`Server is running on port: ${server.address().port}`);

});

routes(app)