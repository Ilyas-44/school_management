import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      // Store the token in local storage or a state management solution (e.g., Redux)
      localStorage.setItem('Token', token);
      console.log(token);
      // Redirect the user to their respective view based on their role
      const role = response.data.user.role;
      if (role === 'Admin') {
        navigate('/');
      } else if (role === 'Enseignant') {
        navigate('/enseignant/home');
      } else if (role === 'Eleve') {
        // Redirect to the eleve view component
        navigate(`/elevepage/${response.data.user.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: `url('/bg.webp')`,
        backgroundSize: 'cover',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: 'rgba(128, 128, 128, 0.5)',
          padding: '2rem 9rem',
          borderRadius: '10px',
        }}
      >
        <div className="mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div 
         style={{
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        
        >
          <button type="submit" className="btn btn-primary">
          Login
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default LoginForm;
