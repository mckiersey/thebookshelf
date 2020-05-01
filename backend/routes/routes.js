// ROUTES FILE TO SET UP LINK TO DATABASE...

// Load the MySQL pool connection

const pool = require('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'This message is coming from the routes file'
        });
    });


// THE BOOKSHOP //
// Fetch videoLinks;
app.get('/videos', (request, response) => {
    pool.query('SELECT videoLink FROM contentData', (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});

//Add a new videoLink
    app.post('/videos', (request, response) => {
        console.log('post sent');
        console.log(request.body);

        //pool.query('INSERT INTO contentData SET ?', request.body, (error, result) => {
          //  if (error) throw error;
            //console.log(error);

            //response.status(201).send(`Video added with ID: ${result.insertId}`);
        //});

    });
}
//ONCE THE ROUTER IS BUILT (ABOVE), WE EXPORT IT SO IT CAN BE USED IN THE APPLICATION

module.exports = router;

