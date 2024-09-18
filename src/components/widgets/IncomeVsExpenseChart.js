import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const IncomeVsExpenseChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/income`);
        const expenseResponse = await axios.get(`${process.env.REACT_APP_API_URL}/expenses`);
        
        const incomeData = incomeResponse.data.reduce((acc, income) => acc + income.amount, 0);
        const expenseData = expenseResponse.data.reduce((acc, expense) => acc + expense.amount, 0);

        setChartData({
          labels: ['Income', 'Expenses'],
          datasets: [
            {
              label: 'Amount',
              data: [incomeData, expenseData],
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
              ],
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching income or expenses:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="widget">
      <h3>Income vs. Expenses</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default IncomeVsExpenseChart;
