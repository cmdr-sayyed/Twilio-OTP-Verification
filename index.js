const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const countryCodeData = require('./country_codes.json');

const twilioRouter = require('./routes/twilioSms');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/twilio-sms',twilioRouter);

const PORT = process.env.PORT || 8000;

  app.listen(PORT,()=>{
    console.log("Connection established succefully!!!")
  })