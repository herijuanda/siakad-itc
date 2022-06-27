// import routes from 'routes';

// load the things we need
const express = require('express');
// const routes = require('./routes/menus/admin');
// const session = require('express-session')
const session = require('cookie-session');
const bodyParser = require('body-parser')

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(session({
    // name                : 'session',
    // keys                : 'ManusiaBiasa',
    secret              : 'ManusiaBiasa', 
    saveUninitialized   : true, 
    resave              : true,
    rolling             : true,
    cookie: {
        httpOnly    : false, 
        secure      : false, 
        maxAge      : 24 * 60 * 60 * 1000
    }
}));
app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs');

require('./routes/data/auth')(app);
require('./routes/data/admin')(app);
require('./routes/data/learner')(app);
require('./routes/data/lecturer')(app);
require('./routes/data/mentor')(app);


app.listen(8080);
console.log('8080 is the magic port');
