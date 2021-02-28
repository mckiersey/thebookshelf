const CLIENT_ID = '170958026096-1delfs3g8tg4hoeg6bgs5ickhpe7k5pt.apps.googleusercontent.com'
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

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