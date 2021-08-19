import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import express from 'express';
const app = express();
dotenv.config();

// Middleware
app.use(express.json());

app.post('/api/email', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.WORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email Sent: ' + info.response);
      res.send('Success');
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port:${PORT}`));
