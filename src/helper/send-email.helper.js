const nodemailer = require('nodemailer');
const path = require("path");

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env;

const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: GOOGLE_EMAIL,
            pass: GOOGLE_PASSWORD,
        },
    });

    return await transporter.sendMail({
        to: to,
        subject: subject,
        html: html
    });

}

module.exports = {
    sendEmail
}