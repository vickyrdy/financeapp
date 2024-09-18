const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model('Reminder', reminderSchema);
