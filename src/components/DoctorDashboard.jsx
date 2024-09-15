import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/doctor-login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/doctor/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDoctor(response.data);
        fetchAppointments(response.data._id);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        setError('Failed to fetch doctor data. Please try logging in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('doctor');
        navigate('/doctor-login');
      }
    };

    fetchDoctorData();
  }, [navigate]);

  const fetchAppointments = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments/${doctorId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to fetch appointments.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    navigate('/doctor-login');
  };

  const generateVideoChatLink = (appointmentId) => {
    return `https://videochat.example.com/appointment/${appointmentId}`;
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Welcome, Dr. {doctor.fullName}</h2>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
      </div>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        {appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id} className="mb-4 p-4 border rounded">
                <p><strong>Patient:</strong> {appointment.patientName}</p>
                <p><strong>Date:</strong> {new Date(appointment.slot.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.slot.time}</p>
                <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
                {appointment.reports && (
                  <p><strong>Reports:</strong> <a href={appointment.reports} target="_blank" rel="noopener noreferrer">View Report</a></p>
                )}
                <a
                  href={generateVideoChatLink(appointment._id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Join Video Chat
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default DoctorDashboard;