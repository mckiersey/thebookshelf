

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



};
module.exports = router;