const otpGenerator = require('otp-generator')

const generateOTP = async()=>{
    try {
        let otplength = parseInt(`${process.env.OTP_LENGTH}`||"4")||4;
        let generatedOtp = await otpGenerator.generate(otplength, { upperCaseAlphabets: false, specialChars: false });
        return generatedOtp;
    } catch (error) {
        throw new Error('Error while generating OTP.');
    }

};


export {generateOTP};


