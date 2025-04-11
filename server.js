// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const goalRoutes = require('./routes/goalRoutes');
app.use(goalRoutes);

app.use(cors());
app.use(bodyParser.json());
app.use('/events', eventRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/calendarDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
