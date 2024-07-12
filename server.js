const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch'); // Ensure you have installed node-fetch: npm install node-fetch
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('public'));

const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Replace with your Apps Script URL

app.post('/send-email', async (req, res) => {
  try {
    // Fetch emails from Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
    const emails = await response.json();

    const { content } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Your Gmail address
        pass: 'your-email-password'    // Your Gmail password or App Password
      }
    });

    let mailOptions = {
      from: 'your-email@gmail.com', // Your Gmail address
      to: emails.join(', '), // Recipients' emails
      subject: 'Subject of Your Email', // Subject of the email
      html: content // HTML body content
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send(error.toString());
      }
      console.log('Email sent:', info.response);
      res.send('Emails sent: ' + info.response);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching emails or sending email.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
