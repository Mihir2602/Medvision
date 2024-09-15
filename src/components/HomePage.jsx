/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';


const Hero = () => (
  <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-10 mb-10 lg:mb-0">
        <h2 className="text-4xl font-bold mb-6">Revolutionizing Healthcare With AI-Powered Tele-Medicine.</h2>
        <p className="text-xl mb-8">Experience cutting-edge remote consultations powered by AI. Get accurate diagnoses for symptoms like rashes, wounds, or oral conditions, anytime, anywhere.</p>
        <button className="bg-emerald-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-emerald-600 transition duration-300">Get Started</button>
      </div>
      <div className="lg:w-1/2 flex justify-center">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg flex items-center justify-center">
          {/* Video */}
          <div className="w-full h-64 bg-gray-300 rounded-lg mt-4 relative">
            <video
              className="w-full h-full object-fill rounded-lg"
              src="/images/MedicalReport.mp4" // Path for the video in the public directory
              autoPlay
              loop
              muted
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center h-full">
    <div className="text-emerald-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-slate-800">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const Features = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    { title: "AI-Powered Diagnostics", description: "Cutting-edge image analysis for accurate symptom assessment", icon: <img src="/images/ai.jpeg" alt="AI" className="w-16 h-16" /> },
    { title: "Secure Video Consultations", description: "High-quality, encrypted video calls with certified doctors", icon: <img src="/images/consult.jpeg" alt="Video" className="w-16 h-16" /> },
    { title: "Instant Medical Reports", description: "Receive detailed reports and prescriptions immediately", icon: <img src="/images/report.jpeg" alt="Reports" className="w-16 h-16" /> },
    { title: "24/7 Availability", description: "Access healthcare services anytime, anywhere", icon: <img src="/images/avail.jpeg" alt="24/7" className="w-16 h-16" /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prevFeature) => (prevFeature + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="bg-slate-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Our Features</h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentFeature * 100}%)` }}
          >
            {features.map((feature, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {features.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full mx-1 ${
                index === currentFeature ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
              onClick={() => setCurrentFeature(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, role, testimonial, image }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <p className="text-slate-600 italic mb-4">"{testimonial}"</p>
    <div className="flex items-center">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="font-semibold text-slate-800">{name}</h4>
        <p className="text-slate-600">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => (
  <div className="bg-slate-200 py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          name="Dr. Sarah Johnson"
          role="Dermatologist"
          testimonial="MediVision's AI-powered image analysis has revolutionized my remote consultations. It's incredibly accurate and saves so much time!"
          image="/images/sarah.jpg"
        />
        <TestimonialCard
          name="Mark Thompson"
          role="Patient"
          testimonial="I got a quick diagnosis for my skin condition without leaving home. The video quality was excellent, and the AI analysis was spot-on!"
          image="/images/michael.jpg"
        />
        <TestimonialCard
          name="Dr. Michael Lee"
          role="General Practitioner"
          testimonial="This platform has allowed me to help patients from all over the country. The technology is seamless and user-friendly."
          image="/images/docti.jpg"
        />
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-800 text-white py-10">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4 text-emerald-400">MediVision</h3>
        <p>Revolutionizing healthcare with AI-powered telemedicine.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-emerald-400 transition duration-300">Home</a></li>
          <li><a href="#" className="hover:text-emerald-400 transition duration-300">How It Works</a></li>
          <li><a href="#" className="hover:text-emerald-400 transition duration-300">Login</a></li>
          <li><a href="#" className="hover:text-emerald-400 transition duration-300">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Contact Us</h4>
        <p>Email: info@medivision.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-emerald-400 transition duration-300">Facebook</a>
          <a href="#" className="hover:text-emerald-400 transition duration-300">Twitter</a>
          <a href="#" className="hover:text-emerald-400 transition duration-300">LinkedIn</a>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center">
      <p>&copy; 2024 MediVision. All rights reserved.</p>
    </div>
  </footer>
);



const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;