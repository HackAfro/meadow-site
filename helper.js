var nodemailer = require('nodemailer');

module.exports = {
    mailTransport: process.env.NODE_ENV === 'development' ? nodemailer.createTransport({
        host: 'mail.meadowfoods.com.ng',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    }) : nodemailer.createTransport({
        host: 'mail.meadowfoods.com.ng',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    }),
    log: console.log,
    validEmail: function ValidateEmail(mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }
};