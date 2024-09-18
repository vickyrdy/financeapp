import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReminderWidget = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reminders`);
        setReminders(response.data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  return (
    <div className="widget">
      <h3>Upcoming Reminders</h3>
      <ul className="list-group">
        {reminders.map(reminder => (
          <li className="list-group-item" key={reminder._id}>
            {reminder.description} - Due on {new Date(reminder.dueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderWidget;
