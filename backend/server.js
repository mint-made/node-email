import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getMaxListeners } from "process";

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.use(express.json);

app.post;

app.post("/", (req, res) => {
  let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
  const mailOptions = {
    from: req.body.email,
    to: "thomaskupai@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.send("error")
    } else {
      console.log("Email Sent " + info.response)
    }
  })
});
})


app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port:${PORT}`));
