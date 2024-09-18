// sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';
import AssistantIcon from '@mui/icons-material/Assistant';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Finance App</h2>
      <List>
        <ListItem button onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate('/expenses')}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItem>
        <ListItem button onClick={() => navigate('/savings')}>
          <ListItemIcon>
            <SavingsIcon />
          </ListItemIcon>
          <ListItemText primary="Savings Goals" />
        </ListItem>
        <ListItem button onClick={() => navigate('/ai-assistant')}>
          <ListItemIcon>
            <AssistantIcon />
          </ListItemIcon>
          <ListItemText primary="Your AI Assistant" />
        </ListItem>
        <ListItem button onClick={() => navigate('/financial-health')}>
          <ListItemIcon>
            <HealthAndSafetyIcon />
          </ListItemIcon>
          <ListItemText primary="Financial Health Check" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
