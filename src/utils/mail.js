// import nodemailer from "nodemailer";
// Create a Nodemailer transporter
// const nodemailer = require("nodemailer");

import axios from "axios";

async function sendOtpEmail(email, otp) {
  try {
    const res = await axios.post("http://10.31.37.133:8000/send_email", {
      send_to_email: email,
      otp: otp.toString(),
    });
    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
//   port: process.env.MAIL_PORT || 2525,
//   secure: false,
//   requireTLS: false,
//   tls: {
//     rejectUnauthorized: false,
//   },
//   debug: true,
//   auth: {
//     user: process.env.MAIL_USER || "4791b869765566",
//     pass: process.env.MAIL_PASS || "8c18caef7362e1",
//   },
// });
// Function to send an email with OTP
// async function sendOtpEmail(email, otp) {
//   console.log(process.env.MAIL_HOST);
//   console.log(email);
//   const mailOptions = {
//     from: process.env.MAIL_FROM,
//     to: email,
//     subject: "OTP Verification",
//     text: `Your OTP is: ${otp}`,
//   };

//   try {
//     console.log("Sending email");
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return { success: false, error: "Email could not be sent" };
//   }
// }

export { sendOtpEmail };
// module.exports = { sendOtpEmail };
