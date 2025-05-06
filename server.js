const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const { dbConfig } = require('./config/db.config');
require('dotenv').config();

const app = express();

app.use(express.json());  
app.use(cookieParser());
app.use(cors({
  origin: '*', // or use '*' for all origins (not recommended for production)
  credentials: true,              // if you're sending cookies/auth headers
}));

// Importing Routes
const userRoutes = require('./routes/User');
const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category');

dbConfig()

app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/category',categoryRoutes)

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