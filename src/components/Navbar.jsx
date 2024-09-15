import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  const isDoctorRoute = location.pathname.startsWith('/doctor');
  const doctorData = JSON.parse(localStorage.getItem('doctor'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    logout({ returnTo: window.location.origin });
  };

  const handleHomeClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-800 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-emerald-400" onClick={handleHomeClick}>MediVision</Link>
        <ul className="flex space-x-4 items-center">
          <li><Link to="/" className="hover:text-emerald-400 transition duration-300" onClick={handleHomeClick}>Home</Link></li>
          <li><Link to="/how-it-works" className="hover:text-emerald-400 transition duration-300">How It Works</Link></li>
          <li><Link to="/faq" className="hover:text-emerald-400 transition duration-300">FAQ</Link></li>
          <li><Link to="/doctor-login" className="hover:text-emerald-400 transition duration-300">Join As Doctor</Link></li>
          
          {!isAuthenticated && !doctorData && (
            <>
              <li><button onClick={() => loginWithRedirect()} className="hover:text-emerald-400 transition duration-300">Login</button></li>
              <li><button onClick={() => loginWithRedirect({ screen_hint: 'signup' })} className="bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-full transition duration-300">Sign Up</button></li>
            </>
          )}
          {(isAuthenticated || doctorData) && (
            <li>
              <button 
                onClick={handleLogout} 
                className="hover:text-emerald-400 transition duration-300"
              >
                Logout
              </button>
            </li>
          )}
          {isAuthenticated && user && (
            <li>
              <div className="flex items-center space-x-2">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-emerald-400">{user.name}</span>
              </div>
            </li>
          )}
          {doctorData && (
            <li>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400">Dr. {doctorData.fullName}</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;