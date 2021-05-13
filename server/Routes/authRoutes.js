const passport = require("passport");
const mongoose = require("mongoose");
// const express = require('express');
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
// const stream = require('stream');
const jwt = require("jsonwebtoken");
const keys = require("../Config/keys");
const puppeteer = require("puppeteer");
const bcrypt = require("bcrypt");
const moment = require("moment");
var faker = require("faker");
// server.js
// ... Code before
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

const BCRYPT_SALT_ROUNDS = 10;

// const { Storage } = require('@google-cloud/storage');

const helpers = require("../helpers/auth");

const User = mongoose.model("users");
const Doctor = mongoose.model("doctors");

module.exports = (app) => {
  // for doc pms code verification api
  async function PMCRegCodeScrapping(reg_no, res) {
    try {
      let site = "https://www.pmc.gov.pk/Doctors/Details?regNo=" + reg_no;

      let browser = await puppeteer.launch();
      let page = await browser.newPage();

      // it has to be Chrome! not HeadlessChrome

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4427.0 Safari/537.36"
      );
      // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/90.0.4427.0 Safari/537.36');

      await page.goto(site, { waitUntil: "networkidle2" });
      // await page.waitForSelector('#reg_no');
      let data = await page.evaluate(() => {
        let reg_No = document.querySelector('div[class="fontLight"] > #reg_no')
          .innerText;
        let full_name = document.querySelector(
          'div[class="fontLight"] > #full_name'
        ).innerText;
        let father_name = document.querySelector(
          'div[class="fontLight"] > #father_name'
        ).innerText;
        let license_valid = document.querySelector(
          'div[class="fontLight"] > #license_valid'
        ).innerText;
        return {
          reg_No,
          full_name,
          father_name,
          license_valid,
        };
      });
      await browser.close();
      console.log("doctor's data", data);
      if (data.reg_No) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return res.send("Error").status(500);
    }
  }

  app.post("/auth/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log("Error1");
        return next(err);
      }
      if (!user) {
        console.log("Error2");
        return res
          .json({
            error: "Email or password is incorrect!",
          })
          .status(401);
      }
      req.login(user, function (err) {
        // I added req.login() here and now deserializeUser is being called and req.user is being set correctly.
        if (err) {
          console.log("Error logging in user", err);
          return res.status(401).json(err);
        }
        const token = jwt.sign(user.firstName, "asdvasdasdasd123235@&^$%#@!ad");
        return res.json({ user: req.user, token }).status(200);
      });
    })(req, res, next);
  });

  app.post("/auth/signup", function (req, res, next) {
    const d = Date();
    let date = d.toString();
    let body = req.body,
      email = body.email,
      password = body.password,
      firstName = body.firstName,
      lastName = body.lastName,
      contact = body.contact,
      city = body.city,
      gender = body.gender,
      doctor = body.doctor;
    if (doctor) {
      Doctor.findOne(
        {
          email: email,
        },

        function (err, user) {
          if (err) {
            return res.send("error occured").status(500);
          } else {
            if (user) {
              return res.send("Email already exists").status(500);
            } else {
              const record = new Doctor();
              record.email = email.trim();
              record.firstName = firstName.trim();
              record.lastName = lastName.trim();
              record.contact = contact.trim();
              record.city = city.trim();
              record.doctor = doctor;
              record.gender = gender;
              record.password = record.hashPassword(password.trim());
              record.save().then((user) => {
                if (user) {
                  return res.send("Doctor's data added").status(200);
                } else {
                  return res.send("db error").status(400);
                }
              });
            }
          }
        }
      );
    }
    if (!doctor) {
      User.findOne(
        {
          email: email,
        },

        function (err, user) {
          if (err) {
            return res.send("error occured").status(500);
          } else {
            if (user) {
              return res.send("Email already exists").status(500);
            } else {
              const record = new User();
              record.email = email.trim();
              record.firstName = firstName.trim();
              record.lastName = lastName.trim();
              record.contact = contact.trim();
              record.city = city.trim();
              record.doctor = doctor;
              record.gender = gender;
              record.password = record.hashPassword(password.trim());
              record.save().then((user) => {
                if (user) {
                  return res.send("User's data added").status(200);
                } else {
                  return res.send("db error").status(400);
                }
              });
            }
          }
        }
      );
    }
  });

  app.get("/auth/current_user", async (req, res) => {
    if (req.user) {
      return res.send(req.user).status(200);
    } else {
      res.send("No user logged in").status(404);
    }
  });

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.send("ok").status(200);
  });

  app.post("/auth/signup-as-doctor", async (req, res) => {
    console.log("req.body /auth/signup-as-doctor", req.body);
    let {
      specialization,
      qualification,
      days,
      startTime,
      endTime,
      yearsOfExp,
      email,
      reg_no,
    } = req.body;
    if (req.body) {
      const resp = await PMCRegCodeScrapping(reg_no, res);
      if (resp) {
        Doctor.findOne(
          {
            email: email,
          },
          async function (err, user) {
            if (err) {
              return res.send("error occured").status(500);
            } else {
              if (user) {
                const doctor = await Doctor.findByIdAndUpdate(
                  {
                    _id: user._id,
                  },
                  {
                    specialization,
                    qualification,
                    days,
                    // startCheckupTime: moment(startTime).format("hh:mm a"),
                    // endCheckupTime: moment(endTime).format("hh:mm a"),
                    startCheckupTime: moment(startTime).toDate(),
                    endCheckupTime: moment(endTime).toDate(),
                    yearsOfExp,
                  }
                );
                doctor.save();
                return res.send("Doctor's details saved").status(200);
              } else {
                return res.send("Unable to store doctor's details").status(400);
              }
            }
          }
        );
      } else {
        return res.send("No record found!").status(400);
      }
    }
  });

  app.post("/auth/verify-email", function (req, res, next) {
    const { email, doctor } = req.body;
    var num = Math.floor(Math.random() * 90000) + 10000;
    if (doctor === true) {
      Doctor.findOne({
        email: email,
      })
        .then((doctor) => {
          if (doctor) {
            return res.send("Email already exists").status(500);
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              port: 587,
              secure: false,
              requireTLS: true,
              auth: {
                user: "no.repy.docSahab@gmail.com",
                pass: keys.gmailPass,
              },
            });

            const mailOptions = {
              from: "no.repy.docSahab@gmail.com",
              to: `${email}`,
              subject: "Email verification code from Doc Sahab",
              html: `<div><p>You have requested to use this email address to access your Doc Sahab account <br>
							  Please enter following code to verify your account</p> <br> <b>Code: ${num} </b></div>`,
            };
            console.log("sending mail");
            try {
              transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.log(err);
                  return res.send("There was an error!").status(400);
                } else {
                  return res.json({ code: num }).status(200);
                }
              });
            } catch (err) {
              console.log(err);
            }
          }
        })
        .catch((err) => {
          return res.send("Server error, Please try again").status(500);
        });
    }
    if (doctor === false) {
      User.findOne({
        email: email,
      })
        .then((user) => {
          if (user) {
            return res.send("Email already exists").status(500);
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              port: 587,
              secure: false,
              requireTLS: true,
              auth: {
                user: "no.repy.docSahab@gmail.com",
                pass: keys.gmailPass,
              },
            });

            const mailOptions = {
              from: "no.repy.docSahab@gmail.com",
              to: `${email}`,
              subject: "Email verification code from Doc Sahab",
              html: `<div><p>You have requested to use this email address to access your Doc Sahab account <br>
							  Please enter following code to verify your account</p> <br> <b>Code: ${num} </b></div>`,
            };
            console.log("sending mail");
            try {
              transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.log(err);
                  return res.send("There was an error!").status(400);
                } else {
                  return res.json({ code: num }).status(200);
                }
              });
            } catch (err) {
              console.log(err);
            }
          }
        })
        .catch((err) => {
          return res.send("Server error, Please try again").status(500);
        });
    }
  });

  app.post("/auth/forgot-password", (req, res) => {
    console.log("/auth/forgotPass req.body: ", req.body);
    console.log(req.body.email);
    User.findOne({
      email: req.body.email,
    }).then(async (user) => {
      if (!user) {
        console.log("email not in database searching in doctor's table");
        Doctor.findOne({
          email: req.body.email,
        }).then(async (doctor) => {
          if (!doctor) {
            return res.json({ Error: "Cannot find this email" }).status(403);
          } else {
            const response = await helpers.forgotPassEmail(
              "Doctor",
              req.body.email
            );
            console.log("response email", response);
            if (response == "ok") {
              return res.status(200).json({ Email: req.body.email });
            } else {
              return res.json({ Error: "There was an error!" }).status(400);
            }
          }
        });
      } else {
        const response = await helpers.forgotPassEmail("User", req.body.email);
        console.log("response email", response);
        if (response == "ok") {
          return res.status(200).json({ Email: req.body.email });
        } else {
          return res.json({ Error: "There was an error!" }).status(400);
        }
      }
    });
  });

  app.get("/auth/reset/:token", (req, res) => {
    const token = req.params.token;

    User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(), //Find time greater than date.Now() or > date.now
      },
    }).then((user) => {
      if (!user) {
        Doctor.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: {
            $gt: Date.now(), //Find time greater than date.Now() or > date.now
          },
        }).then((doctor) => {
          if (!doctor) {
            return res
              .send("password reset link is invalid or has expired")
              .status(403);
          } else {
            return res.redirect("docsahab://resetpassword");
          }
        });
      } else {
        return res.redirect("docsahab://resetpassword");
      }
    });
  });

  app.post("/auth/updatePassword", (req, res) => {
    console.log("auth/updatePassword", req.body);
    const { email, password } = req.body;
    User.findOne({
      email: email,
      //resetPasswordExpires: Date.now(),
    }).then((user) => {
      if (!user) {
        console.log("user not found");
        Doctor.findOne({
          email: email,
        }).then((doctor) => {
          if (!doctor) {
            console.log("doctor not found");
            return res
              .send("password reset link is invalid or has expired, Try again")
              .status(403);
          } else {
            console.log("doctor found in db");
            bcrypt
              .hash(password, BCRYPT_SALT_ROUNDS)
              .then((hashedPassword) => {
                Doctor.findByIdAndUpdate(
                  { _id: doctor._id },
                  {
                    password: hashedPassword,
                  }
                ).then((doctor) => {
                  doctor.save();
                });
              })

              .then(() => {
                return res.send("ok").status(200);
              });
          }
        });
      } else {
        console.log("user found in db");
        bcrypt
          .hash(password, BCRYPT_SALT_ROUNDS)
          .then((hashedPassword) => {
            User.findByIdAndUpdate(
              { _id: user._id },
              {
                password: hashedPassword,
              }
            ).then((user) => {
              user.save();
            });
          })

          .then(() => {
            res.send("ok").status(200);
          });
      }
    });
  });
};
