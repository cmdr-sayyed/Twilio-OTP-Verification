const express = require('express');

const otpController = require('../controller/twilioSms')

const router = express.Router();

router.post('/send-otp', otpController.sendOTP);
router.post('/verify-otp', otpController.verifyOTP);

module.exports = router;