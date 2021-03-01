

// DEFINE APP
const router = app => {

    app.get('/', (request, response) => {
        LandingPage = "/SneakPeak/SneakPeak-Landing.html"
        response.sendFile(__dirname + LandingPage)
    });


    app.get('/peek', (request, response) => {
        PeekPage = "/NewHome.html"
        response.sendFile(__dirname + PeekPage)
    });



};
module.exports = router;