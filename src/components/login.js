import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, verify2FA } from '../utils/api';
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [is2FASent, setIs2FASent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!is2FASent) {
        const response = await loginUser({ email, password });
        if (response.message === 'Verification code sent to email') {
          setIs2FASent(true);
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      } else {
        const { token } = await verify2FA({ email, verificationCode });
        if (token) {
          localStorage.setItem('token', token);
          onLogin(token);
          navigate('/dashboard');
        } else {
          alert('Invalid verification code. Please try again.');
        }
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={is2FASent}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={is2FASent}
          />
          {is2FASent && (
            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          )}
          <button type="submit" className="btn btn-primary">
            {is2FASent ? 'Verify Code' : 'Login'}
          </button>
          {!is2FASent && (
            <>
              <button type="button" className="btn-link" onClick={() => navigate('/register')}>
                Create New User
              </button>
              <button type="button" className="btn-link">
                Forgot Password?
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
