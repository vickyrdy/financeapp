import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { fetchExpenses } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const CircleChart = ({ user }) => {
  const [chartData, setChartData] = useState([]);
  const [timePeriod, setTimePeriod] = useState('day');

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses(user);
        if (Array.isArray(data)) {
          const filteredData = filterDataByTimePeriod(data, timePeriod);
          const categories = {};
          filteredData.forEach(expense => {
            categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
          });
          const formattedData = Object.keys(categories).map(category => ({
            id: category,
            label: category,
            value: categories[category]
          }));
          setChartData(formattedData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadExpenses();
  }, [timePeriod]);

  const filterDataByTimePeriod = (data, period) => {
    const now = new Date();
    return data.filter(expense => {
      const expenseDate = new Date(expense.date);
      if (period === 'day') {
        return expenseDate.toDateString() === now.toDateString();
      } else if (period === 'week') {
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        return expenseDate >= oneWeekAgo;
      } else if (period === 'month') {
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  return (
    <div className="chart-container">
      <select onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod} className="form-select mb-3">
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default CircleChart;
