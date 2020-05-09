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


//FETCH DATA
        // Fetch videoLinks;

        app.get('/videos', (request, response) => {
            pool.query(`SELECT link FROM contentData WHERE user = '${ userName }' AND type = 'video'`, (error, result) => {
                if (error) throw error;
                console.log('Video links requested...')
                response.send(result);
            });
        });
        //FETCH ARTICLES

        app.get('/articles', (request, response) => {
            pool.query(`SELECT link FROM contentData WHERE user = '${userName}' AND type = 'article'`, (error, result) => {
                if (error) throw error;
                console.log('Article links requested...')
                response.send(result);

            });
        });

        // FETCH CAROUSEL IMAGES
        app.get('/carouselImages', (request, response) => {

            pool.query(`SELECT LINK FROM contentData WHERE user = "${userName}" AND type = "image" AND context = "carouselImage"`, (error, result) => {
                if (error) throw error;
                console.log('Location of pictures are:', result)
                response.send(result);

            });
        });


//POST NEW DATA
        //POST VIDEO LINK

        app.post('/videos', (request, response) => {
            console.log('post sent');
            var userName = request.body.user;
            console.log(request.body);
            var videoLink = request.body.videoInput;
            console.log('username:', userName)
            console.log('data is', videoLink)
            pool.query(`INSERT INTO contentData (user, link, type, context) VALUES("${userName}", '${videoLink}', 'video', '');`, (error, result) => {
                if (error) throw error;
                console.log('error type:', error);
               response.status(201).send(`Video added with ID: ${result.insertId}`);
                console.log('Post Success!');
            });
        });

        // POST ARTICLE LINK
        app.post('/articles', (request, response) => {
            console.log('article being posted...');
            console.log(request.body)
            var userName = request.body.accountOwner
            var articleLink = request.body.articleInput
            console.log('Inserting article:', articleLink, ' for user: ', userName)
            pool.query(`INSERT INTO contentData (user, link, type, context) VALUES("${userName}", '${articleLink}', 'article', '');`, (error, result) => {
                if (error) throw error;
                console.log('error type:', error);
                response.status(201).send(`Video added with ID: ${result.insertId}`);
                console.log('Post Success!');
            });

        });

        //POST NEW IMAGE
        app.post('/images', (request, response) => {
            // Add image to server file;


           var nameOfImage = request.files.uploadedImage.name
           var typeOfImage = request.body.uploadedImage;
            console.log('Name of image to be uploaded:', nameOfImage)
            console.log('Type of image to be uploaded:', typeOfImage)


            var imagePath = '/uploads/' + nameOfImage
            request.files.uploadedImage.mv(imagePath);
            //Add image path to database;
            console.log('Inserting image path to database:', imagePath, ' for user: ', userName)
            pool.query(`INSERT INTO contentData (user, link, type, context) VALUES("${userName}", "${imagePath}", "image","${typeOfImage}") ; ` , (error, result) => {
               if (error) throw error;
              console.log('error type:', error);
              response.status(201).send(`Image added!`);
              console.log('Post Success!');

             });

        });

//DELETE DATA

        // Delete a videoLink;
        app.delete('/videos', (request, response) => {
            var videoToDelete = request.query.deleteMeVideo
            console.log('request to delete this data:', videoToDelete, 'for user:', userName);
            console.log('deleting video...')
            pool.query(`DELETE FROM contentData WHERE user = '${userName}' AND type = 'video' AND link = '${videoToDelete}'`, (error, result) => {
                if (error) throw error;
                console.log(response.result);

                response.status(201).send(`Video deleted`);

                console.log('video successfully deleted')
            });
        });

        // Delete an articleLink;

        app.delete('/articles', (request, response) => {
            var articleToDelete = request.query.deleteMeArticle
            var userName = request.query.deleteMeUserName

            console.log('request to delete this data:', articleToDelete, 'for user:', userName);
            console.log('deleting article...')
            pool.query(`DELETE FROM contentData WHERE name = '${userName}' AND type = 'article' AND link = '${articleToDelete}' AND type = 'article'`,
                (error, result) => {
                if (error) throw error;
                console.log(response.result);

                response.status(201).send(`Article deleted`);
                console.log('the result is', result)
                console.log('Article successfully deleted')
            });
        });





};
//ONCE THE ROUTER IS BUILT (ABOVE), WE EXPORT IT SO IT CAN BE USED IN THE APPLICATION

module.exports = router;

