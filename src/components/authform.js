import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

function AuthForm({ type }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = type === 'login' ? 
        await api.post('/auth/login', formData) : 
        await api.post('/auth/register', formData);
      
      localStorage.setItem('token', response.data.token);
      history.push('/dashboard');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
}

export default AuthForm;
