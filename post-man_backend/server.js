const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');

const app = express();

// List of allowed origins
const allowedOrigins = [ process.env.FRONTEND_HOST, process.env.FRONTEND_HOST2, process.env.FRONTEND_HOST3];

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true, // required if you're using cookies
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/requests', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
