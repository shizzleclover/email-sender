const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Replace with your Google Apps Script web app URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyiG89Q2t03eWP3XB6P4YX32pRL_p54f6yFFrl1htInUw6JL1u5QZBbn2Por1lInV56RQ/exec';

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services
  auth: {
    user: 'kupoluyidemilade@gmail.com',
    pass: 'xyz290abcd'
  }
});

app.get('/send-confirmation-emails', async (req, res) => {
  try {
    // Fetch emails from Google Apps Script web app
    const response = await axios.get(APPS_SCRIPT_URL);
    const emails = response.data;

    // Send confirmation emails
    for (const email of emails) {
      await transporter.sendMail({
        from: 'kupoluyidemilade@gmail.com',
        to: email,
        subject: 'Confirmation Email',
        text: 'Thank you for your submission!'
      });
    }

    res.send('Confirmation emails sent successfully.');
  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    res.status(500).send('Error sending confirmation emails');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
