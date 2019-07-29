const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

// Require env variables
require('dotenv').config();

// Sendgrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!
app.use(cors());

// Init Middlewares
app.use(express.json({ extended: false }));

// POST - Send Email throught SendGrid
app.post('/send-email', async (req, res) => {
  //Get Variables from query string in the search bar
  const { nombre, emisor, asunto, texto } = req.body;

  //Sendgrid Data Requirements
  const msg = {
    to: process.env.TARGET_EMAIL,
    from: {
      email: emisor,
      name: nombre
    },
    subject: asunto,
    text: texto
  };

  try {
    //Send Email
    const email = await sgMail.send(msg);

    // Obtener respuesta en JSON para el front-end
    res.json(email);
  } catch (err) {
    console.log('err.message');
  }
});

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
