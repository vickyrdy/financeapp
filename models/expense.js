const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
