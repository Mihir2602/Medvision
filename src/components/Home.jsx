import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Telemedicine Platform</h1>
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/doctor')} 
            className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 shadow-md"
          >
            I'm a Doctor
          </button>
          <button 
            onClick={() => navigate('/patient')} 
            className="w-full py-3 px-6 text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-200 shadow-md"
          >
            I'm a Patient
          </button>
        </div>
      </div>
    </div>
  );
}