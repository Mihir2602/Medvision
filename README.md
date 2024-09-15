- 👋 Hi, I’m  TEAM NAME : TECHIE TRIBE
Participants : Mihir Vyas. Dhruv Vyas, Bhavika Chhatbar & Jay Joshi

This repo contains webapp and AI model
-
- ⚡ # Brain Tumor Detection Web Application

## Overview

This project is a web-based application for brain tumor detection using MRI scans. It utilizes deep learning techniques to analyze MRI images and provide probability estimates for the presence of tumors. The application offers a user-friendly interface for uploading scans, conducting analyses, and generating detailed reports.

## Features

- *MRI Scan Upload*: Support for JPG, JPEG, and PNG image formats.
- *Tumor Detection*: Utilizes a pre-trained deep learning model to predict tumor probability.
- *Advanced Image Processing*: Implements image preprocessing techniques for enhanced analysis.
- *3D Visualization*: Generates interactive 3D plots of MRI scans with potential tumor regions highlighted.
- *Patient Information Management*: Allows input and storage of patient details.
- *Consultation Interface*: Provides a structured workflow for medical consultations.
- *Report Generation*: Creates comprehensive HTML reports with visualizations and analysis results.

## Technologies Used

- Python
- Streamlit
- TensorFlow
- Scikit-learn
- Plotly
- Matplotlib
- Pillow (PIL)
- NumPy
- SciPy

## Model File

The pre-trained model file is hosted on Google Drive due to its large size.

*Google Drive Link*: https://drive.google.com/file/d/1GxejhxN0J0oWBMIpspKHEFGDJmBMaCOT/view?usp=drive_link

## Google Colab

To view and interact with the source code online, you can use our Google Colab notebook:

*Google Colab Link*: https://colab.research.google.com/drive/1E1q9KKJr45EQiwnZls1jKKY4mlxPRUye?usp=sharing

This Colab notebook contains the core functionality of our project and allows you to run the code in a cloud environment.

## Setup and Installation

1. Clone the repository:
   
   git clone https://github.com/Mahi3005/Brain_Tumor_Detection.git
   cd brain-tumor-detection
   

2. Create a virtual environment (optional but recommended):
   
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   

3. Install the required packages:
   
   pip install -r requirements.txt
   

4. Download the pre-trained model:
   - Download brain_tumor_detection_model (1).h5 from the Google Drive link provided in the "Model File" section above.
   - Place the downloaded file in the project's root directory.

## Usage

1. Ensure you have downloaded the model file as described in the setup instructions.

2. Start the Streamlit application:
   
   streamlit run app.py
   

3. Open your web browser and navigate to the URL provided by Streamlit (usually http://localhost:8501).

4. Use the sidebar to navigate between different pages:
   - *Upload MRI Scan*: Upload and analyze MRI scans.
   - *Consultation*: Enter patient information and view detailed analysis results.
   - *Report*: Generate and download comprehensive HTML reports.


## Note on Model File

The deep learning model used in this project (brain_tumor_detection_model (1).h5) is not included in the GitHub repository due to its large size. It is instead hosted on Google Drive to ensure easy access while keeping the repository size manageable. Make sure to download this file before running the application locally.


## Medivision Web-Application



## Overview
This web application is a comprehensive healthcare platform designed to connect patients with doctors, facilitate appointment bookings, and provide medical screening services. It offers a user-friendly interface for both patients and healthcare professionals.

## Features

### For Patients
- User authentication and profile management
- Browse and search for doctors by specialty
- Book appointments with preferred doctors
- Access to a dashboard for managing appointments and medical history
- Medical screening tools (Medivision) for breast cancer and brain tumor

### For Doctors
- Separate login and dashboard for healthcare professionals
- Manage appointments and patient information
- View upcoming consultations and patient history

### General Features
- Responsive design for desktop and mobile devices
- Secure authentication using Auth0 for patient accounts
- Integration with medical screening tools

## Technology Stack
- Frontend: React.js
- Routing: React Router
- Authentication: Auth0 (for patient accounts)
- UI Components: Material-UI, Tailwind CSS
- Backend: (Add your backend technology here, e.g., Node.js, Express)
- Database: (Add your database technology here, e.g., MongoDB, PostgreSQL)

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/healthcare-webapp.git
   cd healthcare-webapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   REACT_APP_AUTH0_DOMAIN=your_auth0_domain
   REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
   REACT_APP_API_URL=your_backend_api_url
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure
```
healthcare-webapp/
├── public/
├── src/
│   ├── components/
│   │   ├── AppointmentForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── DoctorsList.jsx
│   │   ├── HomePage.jsx
│   │   ├── JoinAsDoctor.jsx
│   │   ├── LoginPage.jsx
│   │   ├── Medivision.jsx
│   │   ├── Navbar.jsx
│   │   ├── SignupPage.jsx
│   │   └── UserProfile.jsx
│   ├── hooks/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Contributing
We welcome contributions to improve the Healthcare Web Application. Please follow these steps to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## Contact
Your Name - your.email@example.com

Project Link: [https://github.com/your-username/healthcare-webapp](https://github.com/your-username/healthcare-webapp)


<!---
Mihir2602/Mihir2602 is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
