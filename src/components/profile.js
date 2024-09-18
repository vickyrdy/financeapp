// Profile.js
import React, { useState } from 'react';
import './profile.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Profile = ({ user }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Save the updated details and profile picture here
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="profilePicture">Profile Picture</Label>
          <Input
            type="file"
            id="profilePicture"
            onChange={handleProfilePictureChange}
          />
          {profilePicture && (
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          )}
        </FormGroup>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
