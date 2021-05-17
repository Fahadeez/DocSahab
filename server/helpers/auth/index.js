const passport = require("passport");
const mongoose = require("mongoose");
// const express = require('express');
const nodemailer = require("nodemailer");
// const admin = require('firebase-admin');
// const stream = require('stream');
const jwt = require("jsonwebtoken");
const keys = require("../../Config/keys");
const crypto = require("crypto");

// const puppeteer = require('puppeteer');

// const { Storage } = require('@google-cloud/storage');

let User = mongoose.model("users");
let Doctor = mongoose.model("doctors");

// export const forgotPassEmail = (role) => {
//     const CommonUser = role === "User" ? User : Doctor
//     const token = crypto.randomBytes(20).toString('hex');
//     CommonUser.updateOne(
//         { _id: user._id },
//         {
//             resetPasswordToken: token,
//             resetPasswordExpires: Date.now() + 360000,
//         }
//     ).then(user => { });
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'fahadeez.paki@gmail.com',
//             pass: keys.gmailPass,
//         },
//     });
//     const mailOptions = {
//         from: 'fahadeez.paki@gmail.com',
//         to: `${user.email}`,
//         subject: 'Link To Reset Password',
//         text:
//             'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//             'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
//             `http://192.168.10.7.xip.io:5000/auth/reset/${token}\n\n` +
//             'If you did not request this, please ignore this email and your password will remain unchanged.\n',
//     };

//     console.log('sending mail');
//     try {
//         transporter.sendMail(mailOptions, (err, response) => {
//             if (err) {
//                 console.log('there was an error: ', err);
//                 return res.json({ Error: 'There was an error!' }).status(400);
//             } else {
//                 console.log('here is the res: ', response);
//                 return res.status(200).json({ Email: req.body.email });
//             }
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }
const forgotPassEmail = (role, email) => {
  console.log("/auth/forgotPass req.body: ", role);
  console.log(email);
  const CommonUser = role === "User" ? User : Doctor;

  const token = crypto.randomBytes(20).toString("hex");
  CommonUser.updateOne(
    { email: email },
    {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000,
    }
  ).then((user) => {});
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "no.repy.docSahab@gmail.com",
      pass: keys.gmailPass,
    },
  });
  const mailOptions = {
    from: "no.repy.docSahab@gmail.com",
    to: `${email}`,
    subject: "Link To Reset Password",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
      `http://192.168.1.105:5000/auth/reset/${token}\n\n` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  }; //Change the above ip address to your ip address

  console.log("sending mail");
  try {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log("there was an error: ", err);
          reject("error");
        } else {
          console.log("Email Sent: ", response);
          resolve("ok");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.forgotPassEmail = forgotPassEmail;
