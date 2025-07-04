import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate ,Link} from 'react-router-dom';
import './AuthForm.css';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert("Logged in successfully!");
      setTimeout(() => navigate('/profile'), 300);
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-form-container">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit">Login</button>
      <h1> </h1>

      <Link to= "/register">New User? Please Sign up here</Link>
      </div>
    </form>
  );
};

export default Login;
