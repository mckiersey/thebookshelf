// Podcast API Credentials
const podcastCredentials = require("./ConfigPodcasts.js")
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

    const TestPodcastURL = 'https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0'


    app.get('/api/podcasts', async (req, res) => {
        const response = await unirest.get(TestPodcastURL).header('X-ListenAPI-Key', podcastCredentials.podcastAPIKey)
        console.log(response.toJSON())
        //make sure response should be a JSON object
        var thumbnail = response.body.results[0].thumbnail
        var title = response.body.results[0].title_original
        var url = response.body.results[0].listennotes_url
        var id = response.body.results[0].id
        var allText = response.body.results[0]
        console.log('PODCAST RESPONSE: ', thumbnail, title, url, id, allText)

        res.status(200).send([title, thumbnail, url, id, allText])


    });

};
module.exports = router;