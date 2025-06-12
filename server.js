const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const { dbConfig } = require('./config/db.config');
require('dotenv').config();

const app = express();

app.use(express.json());  
app.use(cookieParser());
const allowedOrigins = [
  'https://oh-natural.com',
  'https://www.oh-natural.com/',
  'https://oh-natural.netlify.app',
  'http://localhost:5173',
  // Add other allowed origins here
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Importing Routes
const userRoutes = require('./routes/User');
const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category');
const settingsRoutes = require('./routes/Settings');

dbConfig()

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/settings',settingsRoutes)

app.get('/ping', (req, res) => {
    res.send('Pong');
  });
  
  // Use your actual deployed URL in production
  const SELF_URL = process.env.SELF_URL || 'http://localhost:3000';
  
  setInterval(() => {
    axios.get(`${SELF_URL}/ping`)
      .then(() => console.log('Pinged self to stay awake'))
      .catch(err => console.error('Self-ping failed:', err.message));
  }, 1000 * 60 * 10);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})