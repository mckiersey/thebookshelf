// Podcast API Credentials
const podcastCredentials = require("/ConfigPodcasts.js")
const unirest = require('unirest');


// DEFINE APP
const router = app => {



    app.get('/', (request, response) => {
        LandingPage = "/SneakPeek/SneakPeek-Landing.html"
        response.sendFile(__dirname + LandingPage)
    });


    app.get('/peek', (request, response) => {
        PeekPage = "/NewHome.html"
        response.sendFile(__dirname + PeekPage)
    });


    // PODCAST API


    app.get('/api/podcasts', (req, res) => {
        unirest.get(podcastAPIURL).header('X-ListenAPI-Key', podcastAPIKey).end((response) => {
            //make sure response should be a JSON object
            var thumbnail = response.body.results[0].thumbnail
            var title = response.body.results[0].title_original
            var url = response.body.results[0].listennotes_url
            var id = response.body.results[0].id
            var allText = response.body.results[0]

            res.status(200).send([title, thumbnail, url, id, allText])

        });
    });

};
module.exports = router;