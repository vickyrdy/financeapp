import React, { useState, useEffect } from 'react';
import { getExpenseSuggestions, getBudgetAdvice } from '../utils/api'; // Adjust path as per your structure


const GenieComponent = ({ user }) => {
  const [expenseSuggestions, setExpenseSuggestions] = useState('');
  const [budgetAdvice, setBudgetAdvice] = useState('');

  const handleReviewExpenses = async () => {
    const suggestions = await getExpenseSuggestions(user);
    setExpenseSuggestions(suggestions.join('\n'));
  };

  const handleGetBudgetAdvice = async () => {
    const advice = await getBudgetAdvice(user);
    setBudgetAdvice(advice);
  };

  return (
    <div className="genie-container">
      <div className="genie">
        <img src="./genie.png" alt="Genie" />
        <button className="left-hand-button" onClick={handleReviewExpenses}>
          Review Your Expenditure
        </button>
        <button className="right-hand-button" onClick={handleGetBudgetAdvice}>
          Get Budget Advice
        </button>
      </div>
      {expenseSuggestions && (
        <div className="suggestions-box">
          <h3>Expense Suggestions</h3>
          <p>{expenseSuggestions}</p>
        </div>
      )}
      {budgetAdvice && (
        <div className="advice-box">
          <h3>Budget Advice</h3>
          <p>{budgetAdvice}</p>
        </div>
      )}
    </div>
  );
};

export default GenieComponent;
