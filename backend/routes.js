

// DEFINE APP
const router = app => {

    app.get('/', (request, response) => {
        LandingPage = "/SneakPeak/SneakPeak-Landing.html"
        response.sendFile(__dirname + LandingPage)
    });


    app.get('/peak', (request, response) => {
        PeakPage = "/NewHome.html"
        response.sendFile(__dirname + PeakPage)
    });



};
module.exports = router;