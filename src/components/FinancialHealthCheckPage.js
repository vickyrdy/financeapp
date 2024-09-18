import React, { useState, useEffect } from 'react';
import { fetchExpenses, fetchUserProfile } from '../utils/api';
import { Typography, Box, Paper, Divider } from '@mui/material';

const FinancialHealthCheckPage = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await fetchUserProfile();
        const userExpenses = await fetchExpenses();
        setBudget(profile.budget);
        setExpenses(userExpenses);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetStatus = budget > totalExpenses ? 'Healthy' : 'Over-budget';

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Financial Health Check
        </Typography>

        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h6">Total Expenses:</Typography>
        <Typography variant="body1">£{totalExpenses.toFixed(2)}</Typography>

        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          Budget:
        </Typography>
        <Typography variant="body1">£{budget.toFixed(2)}</Typography>

        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h6">Status:</Typography>
        <Typography variant="body1">{budgetStatus}</Typography>
      </Paper>
    </Box>
  );
};

export default FinancialHealthCheckPage;
