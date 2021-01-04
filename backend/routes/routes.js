// DEFINE APP
const router = app => {

    app.get('/', (req, res)=> {
        res.send("Status: SERVER LIVE");
    });

    app.get('/users', (req, res)=> {
        res.send("Status: Seán the server is running");
        pool.query('SELECT name, user_id FROM user_profile;', (error, queryResult)=>{
            if(error) throw error;
            res.send(queryResult)
        });
    });

    // CONNECT TO THE DB
    const pool = require('../data/config');

    // REDIRECTS
    const loginPage = '/Users/Seansmac/Desktop/Dev/thebookshelf/backend/views/Authentication.ejs'
    app.get('/login', (req, res)=>{
        console.log('Redirect to index')
        res.render(loginPage)
        });

};
//ONCE THE ROUTER IS BUILT (ABOVE), WE EXPORT IT SO IT CAN BE USED IN THE APPLICATION
module.exports = router;
