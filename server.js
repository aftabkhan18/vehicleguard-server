const express = require('express');
const { Resend } = require('resend');

const app = express();
app.use(express.json());

const resend = new Resend('re_bwpv9ngb_4wAV7Z8AChd5b2UVAMamxbW6');

let crashLogs = [];

async function sendAlert(data) {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ak8867041316@gmail.com',
      subject: 'VehicleGuard — Crash Alert!',
      html: `<h2>CRASH DETECTED!</h2>
             <p><b>Severity:</b> ${data.severity}</p>
             <p><b>Speed:</b> ${data.speed} km/h</p>
             <p><b>Location:</b> ${data.lat}, ${data.lon}</p>
             <p><b>Time:</b> ${data.timestamp}</p>`
    });
    console.log('Email sent:', result);
  } catch (err) {
    console.log('Email error:', err);
  }
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