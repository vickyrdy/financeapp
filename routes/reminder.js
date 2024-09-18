const express = require('express');
const { authenticateToken } = require('../middleware/authmid');
const Reminder = require('../models/reminder');
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id });
    res.json(reminders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { description, dueDate } = req.body;
  try {
    const newReminder = new Reminder({ user: req.user.id, description, dueDate });
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
