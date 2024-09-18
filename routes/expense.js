const express = require('express');
const Expense = require('../models/expense');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    console.log('request received');
    console.log(JSON.stringify(req.body.description));
    const { description, amount, category, date } = req.body;
    try {
        const newExpense = new Expense({
            user: req.body.user._id,
            description,
            amount,
            category,
            date
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        console.log(`expsense find id is ${req.params.id}`)
        const expenses = await Expense.find({ user: req.params.id });
        console.log(`expsense count is ${JSON.stringify(expenses)}`)

        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const { description, amount, category, date } = req.body;
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { description, amount, category, date },
            { new: true }
        );
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
