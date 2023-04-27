var jwt = require('jsonwebtoken');

const generateToken = async(tokenobject : any) => {
    try {
        const token = await jwt.sign(tokenobject, process.env.JWTTOKEN_KEY, {expiresIn: process.env.JWTTOKEN_EXPIRY});
        return token;
    } catch (error) {
        return false;
    };
};

const decodeToken = async(token : any) => {
    console.log(token)
    try {
        let decoded = await jwt.verify(token, process.env.JWTTOKEN_KEY);
        return decoded;
    } catch (error) {
        let data = {error:error}
        return data;
    };
};

export {generateToken,decodeToken};