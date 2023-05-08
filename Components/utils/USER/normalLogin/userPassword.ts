var jwt = require('jsonwebtoken');

const userPasswordToken = async(tokenobject : any) => {
    try {
        const token = await jwt.sign(tokenobject, process.env.JWTUSERPASSWORD_KEY, {expiresIn: process.env.JWTTOKEN_EXPIRY});
        return token;
    } catch (error) {
        return false;
    };
};



export {userPasswordToken};