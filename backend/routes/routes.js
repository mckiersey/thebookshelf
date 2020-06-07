// ROUTES FILE TO SET UP LINK TO DATABASE...
//const bcrypt = require('bcrypt');



// Load the MySQL pool connection
const pool = require('../data/config');
const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'This message is coming from the routes file'
        });
    });

  
// REDIRECTS
app.get('/index', (request, response)=> {
    console.log('sending to index...')
    response.render('index')

});

app.get('/home', (request, response)=> {
    console.log('sending to home...')
    var unloggedUserName = request.query.unloggedUserName
    console.log('unlogged user bookshelf', unloggedUserName)
    let j =[];
    //sample json
    j.push({data:"hi"});

    response.render('home',{json:j});
    //response.render('home', {dataToPass: "passToFrontTest"})

});






app.get('/signUp', (request, response)=> {
    console.log('sending to sign up...')
    response.render('signInSignUp')

});

app.get('/signOut', (request, response)=> {
    console.log('Logging out & sending to back to sign up...')
    response.render('signInSignUp')

});

  // POST NEW USER

  app.post('/users', async (request, response) => {
    try {
        console.log('Creating new user...')
        var NewuserName = request.body.userName
        var Newpassword = request.body.password

        console.log('encrypting credentials...')    
        //To add later: password encryption
        //const salt = await bcrypt.genSalt(10)
        //const hashedPassword = await bcrypt.hash(Newpassword, salt)
        //console.log('The unencrypted password is:', Newpassword, ' and the encrypted password is: ', hashedPassword)
        console.log('posting new user!')
 
    //console.log('Creating user', NewuserName, 'with password', hashedPassword);
    pool.query(`INSERT INTO contentData (user, password) VALUES("${NewuserName}", '${Newpassword}');`, (error, result) => {
        if (error) throw error;
        console.log('error type:', error);
        response.status(201).send(`Hi <b>${NewuserName}</b>, welcome to thebook-shelf! We're creating your account now...`);
        console.log('Post Success!');
        });  
    } catch {
        console.log('caught')
        response.status(500).send('Error')
    }    
});


/////////////////

// SIGN IN AUTHENTICATION

app.post('/auth', function (request, response) {
    console.log(request.body)
    var username = request.body.userName;
    var password = request.body.password;
    console.log('Credentials:', username," | ", password)

    if (username && password) {
        pool.query('SELECT * FROM contentData WHERE user = ? AND password = ?',
        [username, password], function (error, results, fields) {
                if (results.length > 0) {
                    console.log('Credentials match..')
                    response.sendStatus(200);
                } else {
                    response.send('Incorrect Username and/or Password!');
                    console.log('credentials do not match')
                }
                response.end();
            });
    } else {
        response.send('Please enter Username and Password!');
        console.log('no credentials entered')
        response.end();

    };

});



/////////////////////////////////////////////
///////////////////////////////// GET DATA 
/////////////////////////////////////////////


    // FETCH USERS;
    app.get('/users', (request, response) => {
        pool.query(`SELECT DISTINCT user FROM contentData`, (error, result) => {
            if(error) throw error;
            
            response.send(result);
            console.log('Here is the list of all bookshelf users! What wonderful people', result)
        });
    });


   // FETCH PLAYLISTS;
   app.get('/playlists', (request, response) => {
    userName = request.query.userName
    console.log('playlists user name is:' , userName)
    pool.query(`SELECT LINK, context FROM contentData WHERE user = "${userName}" AND type = "music"`, (error, result) => { 
        if (error) throw error;
        response.send(result);
        console.log('playlist results', result)
    });
});

    // Fetch videoLinks;
    app.get('/videos', (request, response) => {
            console.log('video user name', userName)
        pool.query(`SELECT link FROM contentData WHERE user = '${userName}' AND type = 'video'`, (error, result) => {
            if (error) throw error;
            console.log('Video links requested...')
            response.send(result);
        });
    });

    // FETCH PODCASTS
    app.get('/podcasts', (request, response)=>{
        userName = request.query.userName
        context = request.query.podContext
        console.log('the user is',userName, 'and the context is',context)
        pool.query(`SELECT DISTINCT link, caption FROM contentData WHERE user = '${userName}' AND type = 'podcast' AND context = "${context}"`, (error, result) => {
            if (error) throw error;
            console.log('Fetching podcast type:', context, 'for user', userName)
            response.send(result);
        });
    });

    //FETCH ARTICLES
    app.get('/articles', (request, response) => {
        pool.query(`SELECT DISTINCT link, caption FROM contentData WHERE user = '${userName}' AND type = 'article'`, (error, result) => {
            if (error) throw error;
            console.log('Article links requested...')
            response.send(result);
        });
    });

    // FETCH CAROUSEL IMAGES;
    app.get('/carouselImages', (request, response) => {
        userName = request.query.userName
        console.log('Carousel user name is:' , userName)
        pool.query(`SELECT LINK FROM contentData WHERE user = "${userName}" AND type = "image" AND context = "carouselImage"`, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //FETCH GALLERY IMAGES:
    app.get('/images', (request, response) => {
        pool.query(`SELECT DISTINCT LINK, CAPTION FROM contentData WHERE user = "${userName}" AND type = "image" AND context = "gridImage"`, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

      //FETCH PROFILE PICTURE:
      app.get('/profilePictures', (request, response) => {
        pool.query(`SELECT DISTINCT LINK FROM contentData WHERE user = "${userName}" AND type = "image" AND context = "profilePicture"`, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });


/////////////////////////////////////////////
///////////////////////////////// POST DATA 
/////////////////////////////////////////////

//POST MUSIC PLAYLIST
    app.post('/playlists', (request, response) => {
        console.log('playlist post being sent');
        var userName = request.body.user;
        var playlistID = request.body.musicInput;
        var playlistPlatform = request.body.musicType;

        console.log('username:', userName, 'playlist is', playlistID, 'platform is', playlistPlatform)
        pool.query(`INSERT INTO contentData (user, link, type, context) VALUES("${userName}", '${playlistID}', 'music','${playlistPlatform}');`, (error, result) => {
            if (error) throw error;
            console.log('error type:', error);
            response.status(201).send(`Playlist sucessfully added. Refesh the page to see it!`);
            console.log('Post Success!');
        });
    });

    //POST VIDEO LINK
    app.post('/videos', (request, response) => {
        console.log('post sent');
        var userName = request.body.user;
        console.log(request.body);
        var videoLink = request.body.videoInput;
        console.log('username:', userName)
        console.log('data is', videoLink)
        pool.query(`INSERT INTO contentData (user, link, type) VALUES("${userName}", '${videoLink}', 'video');`, (error, result) => {
            if (error) throw error;
            console.log('error type:', error);
            response.status(201).send(`Video sucessfully added. Refesh the page to see it!`);
            console.log('Post Success!');
        });
    });

    // POST PODCAST
    app.post('/podcasts', (request, response)=>{
        console.log('Adding podcast to database')
        console.log(request.body)
        podcastEpDescription = request.body.caption
        podcastLink = request.body.link
        userName = request.body.user
        podcastContext = request.body.context
        selectedPodcast = request.body.podcastName
        podEpCaption = request.body.caption
         if(podcastContext==='episode'){
             var podcastCaption = podEpCaption
         } else{
             var podcastCaption = selectedPodcast
         }

        console.log('selected podcast', selectedPodcast)
        console.log('Description podcast', podcastEpDescription)
        console.log('Link podcast', podcastLink)
        console.log('Username podcast', userName)
        console.log('context podcast', podcastContext)
        console.log('caption podcast', podcastCaption)

        pool.query(`INSERT INTO contentData (user, link, type, context, caption) VALUES("${userName}", "${podcastLink}", 'podcast', "${podcastContext}", "${podcastCaption}");`, (error, result) => {
            if (error) throw error;
            console.log('error type:', error);
            response.status(201).send(`Podcast added to your shelf...`);
            console.log('Podcast Post Success!');
        });
        
    });
    // POST ARTICLE LINK
    app.post('/articles', (request, response) => {
        console.log('article being posted...');
        console.log(request.body)
        var userName = request.body.accountOwner
        var articleLink = request.body.articleInput
        var articleCaption = request.body.articleDescrpition
        console.log('Inserting article:', articleLink, ' for user: ', userName, 'with caption', articleCaption)
        pool.query(`INSERT INTO contentData (user, link, type, caption) VALUES("${userName}", '${articleLink}', 'article', "${articleCaption}");`, (error, result) => {
            if (error) throw error;
            console.log('error type:', error);
            response.status(201).send(`Article sucessfully added to your shelf. Refresh the page to see it!`);
            console.log('Post Success!');
        });

    });

    //POST NEW IMAGE
    app.post('/images', (request, response) => {
        // Add image to server file;


        var nameOfImage = request.files.uploadedImage.name
        var typeOfImage = request.body.uploadedImage[0];
        var captionOfImage = request.body.uploadedImage[1];

        console.log('Name of image to be uploaded:', nameOfImage)
        console.log('Type of image to be uploaded:', typeOfImage)
        console.log('Caption of image to be uploaded:', captionOfImage)


        var imagePath = '/uploads/' + nameOfImage
        request.files.uploadedImage.mv('.' + imagePath);
        //Add image path to database;
        console.log('Inserting image path to database:', imagePath, ' for user: ', userName)
        pool.query(`INSERT INTO contentData (user, link, type, context, caption) VALUES("${userName}", "${imagePath}", "image","${typeOfImage}", "${captionOfImage}") ; `, (error, result) => {
            if (error) throw error;
            console.log('error type:', error);
            response.status(201).send(`Image added! Add another.`);
            console.log('Post Success!');

        });

    });

/////////////////////////////////////////////
///////////////////////////////// DELETE DATA 
/////////////////////////////////////////////

    // Delete a videoLink;
    app.delete('/videos', (request, response) => {
        var videoToDelete = request.query.deleteMeVideo
        console.log('request to delete this data:', videoToDelete, 'for user:', userName);
        pool.query(`DELETE FROM contentData WHERE user = '${userName}' AND type = 'video' AND link = '${videoToDelete}'`, (error, result) => {
            if (error) throw error;
            console.log(response.result);

            response.status(201).send(`Video removed from your shelf. Refresh the page to see the changes!`);

            console.log('Video successfully deleted. ')
        });
    });

     // Delete a podcast;
     app.delete('/podcasts', (request, response) => {
         console.log('podcast delete request', request.query)
        var selectedPodcast = request.query.deleteMePodcast
        var userName = request.query.deleteMeUserName
        var podcastContext = request.query.podcastContext
        console.log('request to delete this podcast:', selectedPodcast, 'for user:', userName, 'with context', podcastContext);
        pool.query(`DELETE FROM contentData WHERE user = '${userName}' AND type = 'podcast' AND context = '${podcastContext}' AND link = '${selectedPodcast}'`, (error, result) => {
            if (error) throw error;
             response.status(201).send(`Podcast removed...`);
            console.log('Podcast successfully successfully removed from shelf')
        });
    });



    // Delete a Carousel image;
    app.delete('/carouselImages', (request, response) => {
        var imagesToDelete = request.query.deleteMeCarouselImages[0];
        var userName = request.query.deleteMeCarouselImages[1];
        var context = request.query.deleteMeCarouselImages[2];
        var type = request.query.deleteMeCarouselImages[3];


        console.log('carousel images to delete: ', imagesToDelete)

        pool.query(`DELETE FROM contentData WHERE user = '${userName}' AND type = 'image' AND link = '${imagesToDelete}' AND context = '${context}'`, (error, result) => {
            if (error) throw error;
            console.log('response result: ',response.result);
            response.status(201).send(`Carousel image deleted`);
            console.log('Carousel image successfully deleted')
        });

    });

    // Delete a gallery image
    app.delete('/images', (request, response) => {
        console.log('gallery image delete request')
        var imageToDelete = request.query.deleteMeImage;
        console.log('delete this image:', imageToDelete)


        pool.query(`DELETE FROM contentData WHERE user = '${userName}' AND type = 'image' AND link = '${imageToDelete}' AND context = 'gridImage'`, (error, result) => {
            if (error) throw error;
            console.log('response result: ', response.result);
            response.status(201).send(`Previous grid image successfully deleted`);
            console.log('Grid image successfully deleted')
        });

    });

        // Delete an articleLink;
        app.delete('/articles', (request, response) => {
            var articleToDelete = request.query.deleteMeArticleCaption.trim()
            var userName = request.query.deleteMeUserName

            console.log('request to delete this data:', articleToDelete, 'for user:', userName);
            console.log('deleting article...')
            pool.query(`DELETE FROM contentData WHERE user = '${userName}' AND type = 'article' AND caption = "${articleToDelete}"`,
                (error, result) => {
                if (error) throw error;

                response.status(201).send(`Article successfully removed from your shelf. Refresh the page to see the changes.`);
                console.log('Article successfully deleted')
            });
        });





};
//ONCE THE ROUTER IS BUILT (ABOVE), WE EXPORT IT SO IT CAN BE USED IN THE APPLICATION

module.exports = router;

