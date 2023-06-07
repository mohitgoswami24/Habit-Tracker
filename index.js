const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

//using expresslayouts
app.use(expressLayouts);

//to parse the body of the request
app.use(bodyParser.urlencoded({extended:false}));

//Ejs for view-engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets')); 

//routes
app.use('/', require('./routes'));

//lauching the server
app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
        return;
    }
    console.log(`Server is up and running on port: http://localhost:${port}`);

});