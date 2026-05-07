const express = require('express');
const app = express();
app.use(express.json());

// Store crashes in memory for now
let crashLogs = [];

// Route — ESP32 sends crash data here
app.post('/crash', (req, res) => {
  const data = req.body;
  data.timestamp = new Date().toISOString();
  crashLogs.push(data);
  console.log('Crash received:', data);
  res.json({ status: 'ok' });
});

// Route — View all crash logs in browser
app.get('/logs', (req, res) => {
  res.json(crashLogs);
});

// Start server
app.listen(3000, () => {
  console.log('VehicleGuard Server running on port 3000');
});