

// DEFINE APP
const router = app => {

    app.get('/', (request, response) => {
        LandingPage = "/SneakPeak/SneakPeak-Landing.html"
        response.sendFile(__dirname + LandingPage)
    });


    app.get('/peak', (request, response) => {
        PeakPage = "To be done"
        //response.sendFile(homepage_file)
        response.send(PeakPage)
    });



};
module.exports = router;