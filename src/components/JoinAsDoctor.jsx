/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const JoinAsDoctor = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    if (token) {
      navigate('/doctor-dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let response;
      if (isLogin) {
        // Login
        response = await axios.post('http://localhost:5000/api/doctor/login', { email, password });
        localStorage.setItem('doctorToken', response.data.token);
        localStorage.setItem('doctorInfo', JSON.stringify(response.data.doctor));
        navigate('/doctor-dashboard');
      } else {
        // Register
        response = await axios.post('http://localhost:5000/api/doctor/register', { email, password, fullName, specialty });
        setIsLogin(true);
        setError('Registration successful. Please log in.');
      }
    } catch (error) {
      console.error('Error:', error.response || error);
      setError(error.response?.data?.message || error.message || 'An error occurred');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Doctor Login' : 'Join As Doctor'}</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
                autoComplete="name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="specialty" className="block mb-2">Specialty</label>
              <input
                type="text"
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
                autoComplete="off"
              />
            </div>
          </>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-emerald-500 hover:underline">
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default JoinAsDoctor;