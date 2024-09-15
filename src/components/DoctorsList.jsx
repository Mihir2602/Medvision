import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import AppointmentForm from './AppointmentForm';
import axios from 'axios';

const DoctorCard = ({ doctor, onAppointmentBooked }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSlotChange = (slot) => {
    setSelectedSlot(JSON.stringify(slot));
  };

  const handleBookAppointment = () => {
    if (selectedSlot) {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const appointmentData = {
        ...formData,
        doctorId: doctor._id,
        slot: JSON.parse(selectedSlot)
      };
      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
      alert('Appointment booked successfully!');
      onAppointmentBooked(response.data);
      setShowForm(false);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>{doctor.name}</CardTitle>
        <CardDescription>{doctor.specialty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Experience: {doctor.experience} years</p>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Available Slots:</h4>
          {doctor.availableSlots.map((slot, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`slot-${doctor.name}-${index}`}
                name={`slot-${doctor.name}`}
                value={JSON.stringify(slot)}
                checked={selectedSlot === JSON.stringify(slot)}
                onChange={() => handleSlotChange(slot)}
                className="mr-2"
              />
              <label htmlFor={`slot-${doctor.name}-${index}`}>
                {slot.date} at {slot.time}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {showForm ? (
          <AppointmentForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
        ) : (
          <button
            onClick={handleBookAppointment}
            disabled={!selectedSlot}
            className="w-full text-white bg-emerald-600 hover:bg-emerald-700 font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Appointment
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { specialty } = location.state || {};

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${specialty}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (specialty) {
      fetchDoctors();
    }
  }, [specialty]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Doctors for {specialty}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorsList;