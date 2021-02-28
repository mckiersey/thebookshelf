

// DEFINE APP
const router = app => {

    app.get('/', (request, response) => {
        LandingPage = "/SneakPeak/SneakPeak-Landing.html"
        response.sendFile(__dirname + LandingPage)
    });


    app.get('/peak', (request, response) => {
        PeakPage = "backend/NewHome.html"
        response.sendFile(__dirname + response)
    });



};
module.exports = router;