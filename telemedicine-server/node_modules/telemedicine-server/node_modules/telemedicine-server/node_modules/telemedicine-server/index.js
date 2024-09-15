const express = require('express');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined in the environment variables');
  process.exit(1);
}


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db("medivision");
    console.log("Connected to MongoDB");

    // Create doctors collection if it doesn't exist
    if (!(await db.listCollections({name: 'doctors'}).hasNext())) {
      await db.createCollection("doctors");
      console.log("Doctors collection created");
    }

    // Create unique index on email field
    await db.collection("doctors").createIndex({ email: 1 }, { unique: true });
    console.log("Unique index on email created for doctors collection");

  } catch (error) {
    console.error("Could not connect to MongoDB or set up collections", error);
    process.exit(1);
  }
}

connectToMongo();

// GET user profile
app.get('/api/profile', async (req, res) => {
  try {
    const userProfiles = db.collection("userProfiles");
    // For now, we'll just return the first profile we find
    // In a real app, you'd want to identify the user somehow
    const profile = await userProfiles.findOne();
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST (create/update) user profile
app.post('/api/profile', upload.single('photo'), async (req, res) => {
  try {
    const userProfiles = db.collection("userProfiles");
    const filter = { email: req.body.email }; // Use email as identifier
    const update = {
      $set: {
        email: req.body.email,
        fullName: req.body.fullName,
        mobileNumber: req.body.mobileNumber,
        aadharNumber: req.body.aadharNumber,
      }
    };

    if (req.file) {
      update.$set.photo = req.file.buffer;
    }

    const options = { upsert: true };
    await userProfiles.updateOne(filter, update, options);
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET doctors by specialty
app.get('/api/doctors/:specialty', async (req, res) => {
  try {
    const { specialty } = req.params;
    const doctorList = db.collection("doctorList");
    const doctors = await doctorList.find({ specialty: { $regex: new RegExp(specialty, 'i') } }).toArray();
    
    if (doctors.length > 0) {
      res.json(doctors);
    } else {
      res.status(404).json({ message: 'No doctors found for this specialty' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// POST doctor registration
app.post('/api/doctor/register', async (req, res) => {
  try {
    const { email, password, fullName, specialty } = req.body;
    const doctors = db.collection("doctors");

    // Check if doctor already exists
    const existingDoctor = await doctors.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = {
      email,
      password: hashedPassword,
      fullName,
      specialty,
      createdAt: new Date()
    };

    await doctors.insertOne(newDoctor);
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/appointments', upload.single('reports'), async (req, res) => {
  try {
    const { doctorName, patientName, symptoms, slot } = req.body;
    const appointments = db.collection("appointments");

    const newAppointment = {
      doctorName,
      patientName,
      symptoms,
      slot: JSON.parse(slot),
      createdAt: new Date()
    };

    if (req.file) {
      // Handle file upload (you might want to use a cloud storage service in a production environment)
      newAppointment.reports = req.file.buffer.toString('base64');
    }

    const result = await appointments.insertOne(newAppointment);
    res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET appointments for a specific doctor
app.get('/api/appointments/:doctorName', async (req, res) => {
  try {
    const { doctorName } = req.params;
    const appointments = db.collection("appointments");
    const doctorAppointments = await appointments.find({ doctorName }).toArray();
    res.json(doctorAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST doctor login
app.post('/api/doctor/login', async (req, res) => {

    const { email, password } = req.body;
    const doctors = db.collection("doctors");

    // Find doctor
    const doctor = await doctors.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT
    const token = jwt.sign({ doctorId: doctor.id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, doctor: { id: doctor.id, email: doctor.email, fullName: doctor.fullName } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));