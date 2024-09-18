import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';
import './login.css'; // Re-use the login CSS for consistent styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ email, password, name });
      if (response.success) {
        alert("User registered successfully. Please login.");
        navigate('/login'); // Navigate to login after successful registration
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error: ", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Register</button>
          <button type="button" className="btn btn-link" onClick={() => navigate('/login')}>Back to Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
