import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    mobileNumber: '',
    aadharNumber: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const validateForm = () => {
    let formErrors = {};
    if (!profile.fullName.trim()) formErrors.fullName = "Full name is required";
    if (!profile.email.trim()) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(profile.email)) formErrors.email = "Email is invalid";
    if (!profile.mobileNumber.trim()) formErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(profile.mobileNumber)) formErrors.mobileNumber = "Mobile number should be 10 digits";
    if (!profile.aadharNumber.trim()) formErrors.aadharNumber = "Aadhar number is required";
    else if (!/^\d{12}$/.test(profile.aadharNumber)) formErrors.aadharNumber = "Aadhar number should be 12 digits";
    if (!profile.photo) formErrors.photo = "Photograph is required";
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const formData = new FormData();
        Object.keys(profile).forEach(key => {
          if (key === 'photo' && profile[key] instanceof File) {
            formData.append(key, profile[key]);
          } else if (key !== 'photo') {
            formData.append(key, profile[key]);
          }
        });

        const response = await axios.post('http://localhost:5000/api/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        setSubmitMessage('Profile updated successfully!');
        setErrors({});
      } catch (error) {
        console.error('Error updating profile:', error);
        setSubmitMessage('Failed to update profile. Please try again.');
      }
    } else {
      setErrors(formErrors);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Profile</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={profile.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={profile.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="mobileNumber" className="sr-only">Mobile Number</label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Mobile Number"
                value={profile.mobileNumber}
                onChange={handleInputChange}
              />
              {errors.mobileNumber && <p className="text-red-500 text-xs italic">{errors.mobileNumber}</p>}
            </div>
            <div>
              <label htmlFor="aadharNumber" className="sr-only">Aadhar Card Number</label>
              <input
                id="aadharNumber"
                name="aadharNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Aadhar Card Number"
                value={profile.aadharNumber}
                onChange={handleInputChange}
              />
              {errors.aadharNumber && <p className="text-red-500 text-xs italic">{errors.aadharNumber}</p>}
            </div>
            <div>
              <label htmlFor="photo" className="sr-only">Photograph</label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                onChange={handlePhotoUpload}
              />
              {errors.photo && <p className="text-red-500 text-xs italic">{errors.photo}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
        {submitMessage && (
          <div className={`mt-3 text-center ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;