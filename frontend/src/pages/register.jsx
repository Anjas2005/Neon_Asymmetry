import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Exclude confirmPassword before sending to API
      const { confirmPassword, ...payload } = formData;
      
      // Adjust URL based on your backend (e.g., /api/register/)
      await api.post('/buyer/register/', payload);
      
      alert("Registration successful! Please login.");
      navigate('/login');
    } catch (err) {
      // Check if the server sent a specific error message
      const msg = err.response?.data?.detail || err.response?.data?.username || "Registration failed";
      setError(JSON.stringify(msg).replace(/["{}[\]]/g, ' ')); 
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Create Account</button>
        
        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
