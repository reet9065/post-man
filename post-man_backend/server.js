const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_HOST,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/requests', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
