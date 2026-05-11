const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

let crashLogs = [];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ak8867041316@gmail.com',
    pass: 'ggff znwn nrzu hdrj'
  }
});

function sendAlert(data) {
  const mailOptions = {
    from: 'ak8867041316@gmail.com',
    to: 'aftab.22eeecambridge.edu.in@gmail.com',
    subject: 'VehicleGuard — Crash Alert!',
    text: `CRASH DETECTED!\n\nSeverity: ${data.severity}\nSpeed: ${data.speed} km/h\nLocation: ${data.lat}, ${data.lon}\nAlcohol: ${data.impaired}\nFire: ${data.fire}\nTime: ${data.timestamp}`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log('Email error:', err);
    else console.log('Email sent:', info.response);
  });
}

app.post('/crash', (req, res) => {
  const data = req.body;
  data.timestamp = new Date().toISOString();
  crashLogs.push(data);
  console.log('Crash received:', data);
  sendAlert(data);
  res.json({ status: 'ok' });
});

app.get('/logs', (req, res) => {
  res.json(crashLogs);
});

app.listen(3000, () => {
  console.log('VehicleGuard Server running on port 3000');
});
