const Habit = require('../models/habit');

//to add new habit
module.exports.createHabit = async function(req, res) {
    try {
        
        let habit = await Habit.findOne({title: req.body.title}).populate();
        
        if(habit) {

            return res.redirect('/');

        } else {

            let habit = await Habit.create({
                title: req.body.title,
                desc: req.body.desc,
                dates : {date : await getTodayDate() , completed : "none"}
            });

            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error in habitController/createHabit: ', error);
        return;
    }
}

//to toggle between status
module.exports.toggleStatus = async function(req, res) {
    try {

        let id = req.query.id;
        let date = req.query.date;
        const habit = await Habit.findById(id);

        if(!habit) {
            console.log('Habit not present!');
            return res.redirect('/');
        }

        let dates = habit.dates;
        let found = false;
        
        dates.find((item, index) =>{
            if(item.date == date){
                if(item.complete === 'y'){
                    item.complete = 'n';
                }else if(item.complete === 'n'){
                    item.complete = 'x';
                }else if(item.complete === 'x'){
                    item.complete = 'y';
                }
                found = true;
            }
        });

        if(!found) {
            dates.push({date : date, complete : 'y'});
        }
       
        habit.dates = dates;
        await habit.save();
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/toggleStatus', error);
        return;
    }
}

//to delete the habit
module.exports.deleteHabit = async function(req, res) {
    try {

        let id = req.query.id;

        let habit  =  await Habit.findById(id);

        habit.deleteOne();

        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return;
    }
}

//to update the habit
module.exports.editHabit = async function(req, res) {
    try {
        let newTitle = req.body.title;
        let newDesc = req.body.desc;
        let id = req.query.id;

        let updatedResult = await Habit.findByIdAndUpdate(
            {
                _id: id
            }, 
            {
                title: newTitle,
                desc: newDesc
            }
        );

        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/editHabit', error);
        return;
    }
}


// this fucntion will return the current data, which will helpful for getting the range of dates
function getTodayDate(){
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;

    let fullDate = month + " " + date;
    return fullDate;
}