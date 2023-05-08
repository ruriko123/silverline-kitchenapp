const otpGenerator = require('otp-generator')

const generateOTP = async()=>{
    try {
        let generatedOtp = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        return generatedOtp;
    } catch (error) {
        throw new Error('Error while generating OTP.');
    }

};


export {generateOTP};


