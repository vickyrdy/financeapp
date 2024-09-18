const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const Income = require('../models/income');
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.json(incomes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { source, amount, date } = req.body;
  try {
    const newIncome = new Income({ user: req.user.id, source, amount, date });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
