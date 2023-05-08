import nodemailer from 'nodemailer';

const createTransporter = async() => {
    let port:number = parseInt(process.env.EMAIL_smtp_port||"587") || 587;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: port  ,
        secure: false,
        auth: {
            user: process.env.EMAIL_sender,
            pass: process.env.EMAIL_sender_pass
        }
    });
    return transporter;
};


export {createTransporter};