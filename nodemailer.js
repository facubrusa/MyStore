"use strict";
const nodemailer = require("nodemailer");
const { config } = require('./config/config');

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.email,
        pass: config.emailPassword
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'facundobrusa11@gmail.com', // sender address
    to: "fbrusa@nexosoluciones.com.ar", // list of receivers
    subject: "Hello Facu 2", // Subject line
    text: "Hello men, what's up ? Do you want play lol all night ?", // plain text body
    html: "<b>Hello men, what's up ? Do you want play lol all night ?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail();
