//importing mongoose package
const mongoose = require('mongoose');

// create a habit schema
const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    desc: {
        type: String
    },
    dates: [{
        date: String,
        complete: String
    }]
}, {
    timestamps: true,
})

//setting the model 
const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;