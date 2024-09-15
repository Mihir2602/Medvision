import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="./Dashboard.jsx" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <div>
          <button
            onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Sign up with Auth0
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;