import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const DiseaseCard = ({ title, videoSrc, description, specialty }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/doctors-list', { state: { specialty } });
  };

  return (
    <Card className="w-full max-w-sm mx-auto transform transition duration-500 hover:scale-105">
      <CardHeader className="flex flex-col items-center">
        <div className="w-24 h-24 overflow-hidden rounded-full mb-4">
          <video 
            src={videoSrc} 
            alt={title} 
            className="w-full h-full object-cover rounded-full" 
            autoPlay 
            loop 
            muted 
          />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <button 
          onClick={handleBookAppointment}
          className="text-white bg-emerald-600 hover:bg-slate-700 hover:text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Book Appointment
        </button>
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  const diseases = [
    { 
      title: "Brain Tumour", 
      videoSrc: "/videos/brain.mp4", 
      description: "Abnormal growth of cells in the brain.",
      specialty: "Brain Tumour"
    },
    { 
      title: "Cardio Disease", 
      videoSrc: "/videos/heart.mp4", 
      description: "Conditions affecting the heart and blood vessels.",
      specialty: "Cardio Disease"
    },
    { 
      title: "Peptic Ulcer", 
      videoSrc: "/videos/liver.mp4", 
      description: "Conditions forming ulcers in liver",
      specialty: "Peptic Ulcer"
    },
    { 
      title: "Breast Cancer", 
      videoSrc: "/videos/breastCancer.mp4", 
      description: "Cancer that forms in the cells of the breasts.",
      specialty: "Breast Cancer"
    },
    { 
      title: "Diabetes", 
      videoSrc: "/videos/Diabetes.mp4", 
      description: "A group of diseases that affect how your body uses blood sugar.",
      specialty: "Diabetes"
    },
    { 
      title: "Lung Cancer", 
      videoSrc: "/videos/Lung.mp4", 
      description: "Cancer that begins in the lungs and most often occurs in people who smoke.",
      specialty: "Lung Cancer"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Disease Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseases.map((disease, index) => (
            <DiseaseCard key={index} {...disease} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;