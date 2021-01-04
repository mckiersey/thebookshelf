// DEFINE APP
const router = app => {
    app.get('/', (req, res)=> {
        res.send("Status: Seán the server is running");
    });


// REDIRECTS
const loginPage = '/Users/Seansmac/Desktop/Dev/thebookshelf/backend/index.html'
app.get('/login', (req, res)=>{
    console.log('Redirect to index')
    res.sendFile(loginPage)
    });

};
//ONCE THE ROUTER IS BUILT (ABOVE), WE EXPORT IT SO IT CAN BE USED IN THE APPLICATION
module.exports = router;
