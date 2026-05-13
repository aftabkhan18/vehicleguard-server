const express = require('express');
<<<<<<< HEAD
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
             <p><b>Alcohol:</b> ${data.impaired}</p>
             <p><b>Fire:</b> ${data.fire}</p>
             <p><b>Time:</b> ${data.timestamp}</p>`
    });
    console.log('Email sent:', result);
  } catch (err) {
    console.log('Email error:', err);
  }
=======
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
    if (err) {
      console.log('Email error FULL:', JSON.stringify(err));
    } else {
      console.log('Email sent:', info.response);
    }
  });
>>>>>>> 094060ace5afd55d126af97a12f06211ba14a316
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
