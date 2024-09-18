import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchExpenses } from '../../utils/api';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseByCategoryChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
      const loadExpenses = async () => {
          try {
              const expenses = await fetchExpenses();
              if (expenses && Array.isArray(expenses)) {
                  const categories = {};
                  expenses.forEach(expense => {
                      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
                  });

                  setChartData({
                      labels: Object.keys(categories),
                      datasets: [{
                          label: 'Expenses by Category',
                          data: Object.values(categories),
                          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                      }]
                  });
              }
          } catch (error) {
              console.error('Error fetching expenses:', error);
          }
      };

      loadExpenses();
  }, []);

  if (!chartData) {
      return <div>Loading...</div>;
  }

  return (
      <div>
          <h3>Expense Chart</h3> {/* Added a header to the chart */}
          <Doughnut data={chartData} />
      </div>
  );
};

export default ExpenseByCategoryChart;
