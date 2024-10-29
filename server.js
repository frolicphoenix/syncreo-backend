const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Update CORS settings
const corsOptions = {
  origin: 'https://syncreo-ca4cce3d6642.herokuapp.com', // replace with your frontend Heroku URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // explicitly allow all methods
  allowedHeaders: 'Content-Type,Authorization', // allow these headers
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests

app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const proposalRoutes = require('./routes/proposalRoutes');
const messageRoutes = require('./routes/messageRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Freelancing App API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
