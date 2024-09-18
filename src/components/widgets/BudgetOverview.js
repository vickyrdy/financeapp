import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetOverview = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/budgets`);
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div className="widget">
      <h3>Budget Overview</h3>
      <ul className="list-group">
        {budgets.map(budget => (
          <li className="list-group-item" key={budget._id}>
            {budget.category}: {budget.spent} / {budget.amount} 
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
                aria-valuenow={(budget.spent / budget.amount) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetOverview;
