const {TWILIO_VERIFY_ID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = process.env;

const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
    lazyLoading:true
})

const Data = require('../country_codes.json');

const getCountryCode = (code)=>{
    const countryData = Data.filter((c_data)=>{
        return c_data.code === code.toUpperCase();
     })
     const dialCode = countryData[0].dial_code;
     return dialCode;
}

exports.sendOTP = async(req, res) => {
    // const countryCode = req.body.countryCode;
    const phoneNumber = req.body.phoneNumber;
    const code = req.body.code;

    const dialCode = getCountryCode(code);
    
    try {
        const otpResponse = await client.verify.v2
                                        .services(TWILIO_VERIFY_ID)
                                        .verifications.create({ to: `${dialCode}${phoneNumber}` , channel: "sms" })
        res.status(200).json('otp send successfully!! '+ JSON.stringify(otpResponse))
    } catch (error) {
        res.status(500).json('something went wrong!!!',error)
    }
}

exports.verifyOTP = async(req, res) =>{
    // const countryCode = req.body.countryCode;
    const phoneNumber = req.body.phoneNumber;
    const code = req.body.code;
    const otp = req.body.otp;

    // console.log(countryCode, phoneNumber, otp)
    const dialCode = getCountryCode(code);

    try {
        const verifiedResponse = await client.verify.v2
                                            .services(TWILIO_VERIFY_ID)
                                            .verificationChecks.create({ to:`${dialCode}${phoneNumber}`, code: otp })
                                               
        res.status(200).json('otp verified successfully' + JSON.stringify(verifiedResponse));
    } catch (error) {
        res.status(500).json("Something went wrong!!!")
    }
}