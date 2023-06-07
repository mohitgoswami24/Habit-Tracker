const mongoose = require('mongoose');

//making connection to local database
mongoose.connect("mongodb://127.0.0.1:27017/Habits");

//Setting database to db
const db = mongoose.connection;

//on error
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//on connection
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;