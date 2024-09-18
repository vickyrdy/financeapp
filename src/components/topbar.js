// topbar.js
import React, { useState } from 'react';
import { Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import './topbar.css';

const Topbar = ({ notifications, onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); 

  const toggleNotificationDropdown = () => setIsNotificationOpen(!isNotificationOpen);
  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <h2>Finance App</h2>
      </div>
      <div className="topbar-right">
        <Dropdown isOpen={isNotificationOpen} toggle={toggleNotificationDropdown}>
          <DropdownToggle className="topbar-notification">
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </DropdownToggle>
          <DropdownMenu end>
            {notifications.length === 0 ? (
              <DropdownItem>No Notifications</DropdownItem>
            ) : (
              notifications.map((notification, index) => (
                <DropdownItem key={index}>{notification.message}</DropdownItem>
              ))
            )}
          </DropdownMenu>
        </Dropdown>

        <Dropdown isOpen={isProfileOpen} toggle={toggleProfileDropdown}>
          <DropdownToggle className="topbar-avatar">
            <Avatar alt="User Profile" src="genie.png" className="avatar" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem onClick={() => window.location.href = '/profile'}>
              Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={onLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
