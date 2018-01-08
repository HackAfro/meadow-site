var express = require('express');
var router = express.Router();
var helpers = require('../helper');
const log = helpers.log;

function sendMail(req, res, next) {
    const transporter = helpers.mailTransport;
    const data = req.body;
    console.log(data);
    console.log(data.email);
    if (!helpers.validEmail(data.email)) {
        const message = {
            message: "Please enter a valid email"
        };
        res.status(400).json(message);
        return false;
    }

    const mailOptions = {
        from: process.env.GMAIL,
        to: `richyafro@gmail.com`,
        subject: `Message from ${data.name}`,
        html: `<h4 style="text-align:center; font-weight:bold; color: lightgreen">You have a new message</h4>
                <p style="font-weight:bold; opacity: .75">From: ${data.name}-${data.email}</p>       
                <div style="padding: 35px 15px; margin-top:15px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10); border-radius:5px; background: lightgreen; color:white">
                    <p>${data.message}<p/>
                </div> 
                `
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            const message = {
                message: "There was an error while sending your message"
            };
            res.status(400).json(message);
            return false;
        }
        const message = {
            message: "Your message was sent successfully"
        }
        res.status(200).json(message);
    });
    return true;
}
router.post('/', sendMail);

module.exports = router;