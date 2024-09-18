import React, { useState, useEffect } from 'react';
import ExpenseList from './expenselist';
import { fetchExpenses } from '../utils/api';
import '../expenses.css';

function Expenses({user}) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
      const loadExpenses = async () => {
          try {
              const expensesData = await fetchExpenses(user);
              setExpenses(expensesData);
          } catch (error) {
              console.error('Error fetching expenses:', error);
          }
      };

      loadExpenses();
  }, []);
  return (
    <div className="expenses-container">
      <h2>Expenses</h2>
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default Expenses;
