const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const Budget = require('../models/budget');
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { category, amount, spent } = req.body;
  try {
    const newBudget = new Budget({ user: req.user.id, category, amount, spent });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
