// ROUTES FILE TO SET UP LINK TO DATABASE...

// Load the MySQL pool connection

const pool = require('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'This message is coming from the routes file'
        });
    });

    // SET USERNAME //

    var userName = 'sean';

    console.log(`my user name is ${userName} in this string`)


    // THE BOOKSHOP //
    // Fetch videoLinks;

    app.get('/videos', (request, response) => {
        pool.query('SELECT videoLink FROM contentData', (error, result) => {
            if (error) throw error;
            console.log('Video links requested...')
            response.send(result);
        });
    });

    //Add a new videoLink

    app.post('/videos', (request, response) => {
        console.log('post sent');
        //var userName = request.body.name;
        console.log(request.body);
        var videoLink = request.body.videoInput;
        console.log('username:', userName)
        console.log('data is', videoLink)
        pool.query(`INSERT INTO contentData (name, videoLink) VALUES("${userName}", "${videoLink}");`, (error, result) => {
            if (error) throw error;
            console.log('error type:', error);

            response.status(201).send(`Video added with ID: ${result.insertId}`);
            console.log('Post Success!');
        });

    });

    // Delete a videoLink;
    app.delete('/videos', (request, response) => {
        var videoToDelete = request.query.deleteMeVideo
        console.log('request to delete this data:', videoToDelete);
        console.log('deleting video...')
        pool.query(`DELETE FROM contentData WHERE name = "${userName}" AND videoLink = "${videoToDelete}"`, (error, result) => {
            if (error) throw error;

            response.status(201).send(`Video deleted`);

            console.log('video successfully deleted')
        });
    });

};
//ONCE THE ROUTER IS BUILT (ABOVE), WE EXPORT IT SO IT CAN BE USED IN THE APPLICATION

module.exports = router;

