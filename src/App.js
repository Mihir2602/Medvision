import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import DoctorsList from './components/DoctorsList';
import JoinAsDoctor from './components/JoinAsDoctor';
import DoctorDashboard from './components/DoctorDashboard';
import AppointmentForm from './components/AppointmentForm';

function App() {
  return (
    <Auth0Provider
      domain="dev-dd8udv7ifbq6uda4.us.auth0.com"
      clientId="E8cbE7vcC8vrFwNYcCFT91HyxmGGp7LD"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/dashBoard"
      }}
    >
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctors-list" element={<DoctorsList />} />
              <Route path="/doctor-login" element={<JoinAsDoctor />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointment" element={<AppointmentForm/>} />

            </Routes>
          </main>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;