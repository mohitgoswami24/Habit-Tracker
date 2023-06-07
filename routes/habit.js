const express = require('express');

const router = express.Router();
const habitController = require('../controllers/habit_controller');

//to add new habit
router.post('/create-habit', habitController.createHabit);

//to toggle between status of the habits
router.get('/toggle-status', habitController.toggleStatus);

//to delete the habit
router.get('/delete-habit', habitController.deleteHabit);

//to update the habit
router.post('/edit-habit', habitController.editHabit);

module.exports = router;