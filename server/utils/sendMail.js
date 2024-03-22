const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
   service : 'gmail',  //gmail maa send garna lageko so gmail use gareko otherwise outlook jasta service pni hunxan
    auth: {
      user: process.env.EMAIL_USER,  //sender ko gmail
      pass: process.env.EMAIL_PASS,  //google bata create gareko app password
    },
  });

  const mailOptions = {
    from: "Rohan Chaudhary <hellorohan@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;