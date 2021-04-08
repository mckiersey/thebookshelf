// Podcast API Credentials
const unirest = require('unirest');

const sourceFile = require('./ConfigPodcasts.js');
console.log("imported key: ", sourceFile.podcastAPIKey);

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
    app.post('/api/podcasts', async (req, res) => {
        var PodcastSearchTerm = req.body.PodcastSearchTerm
        var PodcastSearchTermAPI = 'https://listen-api.listennotes.com/api/v2/search?q=' + PodcastSearchTerm + '&type=podcast'
        const response = await unirest.get(PodcastSearchTermAPI).header('X-ListenAPI-Key', sourceFile.podcastAPIKey)

        console.log(response.body.results[0])
        var thumbnail = response.body.results[0].thumbnail
        var title = response.body.results[0].title_original
        var url = response.body.results[0].listennotes_url
        var id = response.body.results[0].id
        var allText = response.body.results[0]
        res.status(200).send([title, thumbnail, url, id, allText])
    });

    // PODCAST EPISODE API
    app.post('/api/podcasts/episodes', async (req, res) => {
        console.log('episode api')
        var PodcastSearchTerm = req.body.PodcastSearchTerm
        var PodcastSearchTermAPI = 'https://listen-api.listennotes.com/api/v2/search?q=' + PodcastSearchTerm + '&type=episode'
        const response = await unirest.get(PodcastSearchTermAPI).header('X-ListenAPI-Key', sourceFile.podcastAPIKey)

        var thumbnail = response.body.results[0].thumbnail
        var title = response.body.results[0].title_original
        var url = response.body.results[0].listennotes_url
        var id = response.body.results[0].id
        var allText = response.body.results[0]
        res.status(200).send([title, thumbnail, url, id, allText])
    });



};
module.exports = router;