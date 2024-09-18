import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function ExpenseList({ expenses }) {
  const [filter, setFilter] = useState('all');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  // Ensure expenses is an array before filtering

  useEffect(() => {
    const filteredExpenses = Array.isArray(expenses)
      ? expenses.filter(expense => {
        if (filter === 'day') {
          return new Date(expense.date).toDateString() === new Date().toDateString();
        } else if (filter === 'week') {
          let oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return new Date(expense.date) >= oneWeekAgo;
        } else if (filter === 'month') {
          return new Date(expense.date).getMonth() === new Date().getMonth();
        }
        return true;
      })
      : [...expenses];
    setFilteredExpenses([...filteredExpenses]);

  }, [expenses, filter]);

  return (
    <div className="widget">
      <h3>Expense List</h3>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          label="filter"
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"day"}>Last Day</MenuItem>
          <MenuItem value={"week"}>Last Week</MenuItem>
          <MenuItem value={"month"}>Last Month</MenuItem>
        </Select>
      </FormControl>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {filteredExpenses.map(expense => (
          <Item key={expense._id}>{expense.description} - £{expense.amount} ({expense.category})</Item>
        ))}
      </Stack>
    </div>
  );
}

export default ExpenseList;
