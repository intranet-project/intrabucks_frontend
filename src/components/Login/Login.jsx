import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {
          const response = await axios.post('http://localhost:9000/api/v1/intrabucks/main/login', {
              email: email,
              password: password
          });

          // Assuming the token is in the Authorization header
          const token = response.headers['authorization'];
          sessionStorage.setItem('jwt', token);
          alert('Login successful');
          navigate('/home');
          // Redirect or do something after login
      } catch (error) {
          setError('Invalid email or password');
      }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
    <h1 style={{ fontSize: '50px', fontWeight: 'bold' }}>로그인</h1>
        <div className="Email-formGroup" >
            <label>Email</label>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                style={{ padding: '1rem', height: '3.5rem' }}  // 입력 필드의 높이와 너비 설정
                required
            />
        </div>
        <div className="Pwd-formGroup">
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                style={{ padding: '1rem', height: '3.5rem' }} 
                required
            />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">Login</button>
    </form>
</div>
  );
};

export default Login;