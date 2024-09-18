const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
  const { description, amount, category, date } = req.body;
  const userId = req.user._id;
  try {
    const newExpense = new Expense({ user: userId, description, amount, category, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    console.log('fu xuan')
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, category, date } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(id, { description, amount, category, date }, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
