const passport = require('passport');
const mongoose = require('mongoose');
// const express = require('express');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
// const stream = require('stream');
const jwt = require('jsonwebtoken');
const keys = require('../Config/keys');
const puppeteer = require('puppeteer');

const { Storage } = require('@google-cloud/storage');

const helpers = require('../helpers/auth');

const User = mongoose.model('users');
const Doctor = mongoose.model('doctors');


module.exports = app => {

	// for doc pms code verification api
	async function PMCRegCodeScrapping(reg_no, res) {
		try {
			let site = 'https://www.pmc.gov.pk/Doctors/Details?regNo=' + reg_no;

			let browser = await puppeteer.launch();
			let page = await browser.newPage();

			await page.goto(site, { waitUntil: 'networkidle2' });

			let data = await page.evaluate(() => {
				let reg_No = document.querySelector('div[class="fontLight"] > #reg_no').innerText;
				let full_name = document.querySelector('div[class="fontLight"] > #full_name').innerText;
				let father_name = document.querySelector('div[class="fontLight"] > #father_name').innerText;
				let license_valid = document.querySelector('div[class="fontLight"] > #license_valid').innerText;
				return {
					reg_No,
					full_name,
					father_name,
					license_valid
				}
			});
			await browser.close();
			console.log("doctor's data", data);
			if (data.reg_No) {

				return true
			}
			else {
				return false
			}

		}
		catch (err) {
			console.log(err)
			return res.send("Error").status(500)
		}
	}

	app.post('/auth/login', (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				console.log('Error1');
				return next(err);
			}
			if (!user) {
				console.log('Error2');
				return res
					.json({
						error: 'Email or password is incorrect!',
					})
					.status(401);
			}
			req.login(user, function (err) {
				// I added req.login() here and now deserializeUser is being called and req.user is being set correctly.
				if (err) {
					console.log("Error logging in user", err)
					return res.status(401).json(err);
				}
				const token = jwt.sign(user.firstName, 'asdvasdasdasd123235@&^$%#@!ad');
				return res.json({ user: req.user, token }).status(200);
			});
		})(req, res, next);
	});

	app.post('/auth/signup', function (req, res, next) {
		const d = Date();
		let date = d.toString()
		let body = req.body,
			email = body.email,
			password = body.password,
			firstName = body.firstName,
			lastName = body.lastName,
			contact = body.contact,
			city = body.city,
			role = body.role;
		if (role) {
			Doctor.findOne(
				{
					email: email,
				},

				function (err, user) {
					if (err) {
						return res.send('error occured').status(500);
					} else {
						if (user) {
							return res.send('Email already exists').status(500);
						} else {
							const record = new Doctor();
							record.email = email.trim();
							record.firstName = firstName.trim();
							record.lastName = lastName.trim();
							record.contact = contact.trim();
							record.city = city.trim();
							record.doctor = role;
							record.password = record.hashPassword(password.trim());
							record.save().then((user) => {
								if (user) {
									return res.send("Doctor's data added").status(200);

								} else {
									return res.send('db error').status(400);
								}
							});
						}
					}
				}
			);
		}
		if (!role) {
			User.findOne(
				{
					email: email,
				},

				function (err, user) {
					if (err) {
						return res.send('error occured').status(500);
					} else {
						if (user) {
							return res.send('Email already exists').status(500);
						} else {
							const record = new User();
							record.email = email.trim();
							record.firstName = firstName.trim();
							record.lastName = lastName.trim();
							record.contact = contact.trim();
							record.city = city.trim();
							record.doctor = role;
							record.password = record.hashPassword(password.trim());
							record.save().then((user) => {
								if (user) {
									return res.send("User's data added").status(200);
								} else {
									return res.send('db error').status(400);

								}
							});
						}

					}
				}
			);
		}
	});


	app.get('/auth/current_user', (req, res) => {
		if (req.user) {
			return res.send(req.user).status(200);
		}
		else {
			res.send("No user logged in").status(404);
		}
	});

	app.get('/auth/logout', (req, res) => {
		req.logout();
		res.send('ok').status(200);

	});


	// app.get('/api/user', async (req, res) => {
	// 	if (req.user) {
	// 		const user = await User.findById({ _id: req.user._id });
	// 		res.send(user);
	// 	}
	// });
	// app.get('/auth/redirect', (req, res) => {
	// 	//console.log(req.user.dataValues);
	// 	res.send('ok').status(200);

	// });


	// app.post('/auth/role', async (req, res) => {
	// 	if (req.body && req.user) {
	// 		const user = await User.findByIdAndUpdate({ _id: req.user._id },
	// 			{ role: req.body.role });
	// 		user.save();
	// 		res.send('record updated').status(200);
	// 	}

	// 	console.log("User not logged in")

	// });

	app.post('/auth/signup-as-doctor', async (req, res) => {
		console.log("req.body /auth/signup-as-doctor", req.body)
		let { specialization, qualification, days, timeSlots, yearsOfExp, email, reg_no } = req.body;
		if (req.body) {
			const resp = await PMCRegCodeScrapping(reg_no, res)
			if (resp) {
				Doctor.findOne(
					{
						email: email,
					},
					async function (err, user) {
						if (err) {
							return res.send('error occured').status(500);
						} else {
							if (user) {
								const doctor = await Doctor.findByIdAndUpdate(
									{
										_id: user._id,
									}, { specialization, qualification, days, timeSlots, yearsOfExp }
								)
								doctor.save()
								return res.send("Doctor's details saved").status(200)
							} else {
								return res.send("Unable to store doctor's details").status(400)
							}
						}
					}
				)
			}
			else {
				return res.send('No record found!').status(400)
			}
		}
	});


	// app.post('/auth/checkEmail', function (req, res, next) {
	// 	var num = Math.floor(Math.random() * 90000) + 10000;

	// 	User.findOne(
	// 		{
	// 			email: req.body.email,
	// 		},

	// 		function (err, user) {
	// 			if (err) {
	// 				return res.send('error occured').status(500);
	// 			} else {
	// 				if (user) {
	// 					return res.send('Email already exists').status(500);
	// 				} else {
	// 					const transporter = nodemailer.createTransport({
	// 						service: 'gmail',
	// 						port: 587,
	// 						secure: false,
	// 						requireTLS: true,
	// 						auth: {
	// 							user: 'no.reply.teachinn@gmail.com',
	// 							pass: keys.gmailPass,
	// 						},
	// 					});

	// 					const mailOptions = {
	// 						from: 'no.reply.teachinn@gmail.com',
	// 						to: `${req.body.email}`,
	// 						subject: 'Email verification code from TeachInn',
	// 						html:
	// 							`<div><p>You requested to use this email address to access your TeachInn account <br>
	// 						  Please enter following code to verify your account</p> <br> <b>Code: ${num} </b></div>`
	// 					};
	// 					console.log('sending mail');
	// 					try {

	// 						transporter.sendMail(mailOptions, (err, response) => {
	// 							if (err) {
	// 								console.log(err)
	// 								return res.send('There was an error!').status(400);
	// 							} else {
	// 								return res.json({ code: num }).status(200);
	// 							}
	// 						});
	// 					} catch (err) {
	// 						console.log(err);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	);
	// });

	app.post('/auth/forgot-password', (req, res) => {
		console.log('/auth/forgotPass req.body: ', req.body);
		console.log(req.body.email);
		User.findOne({
			email: req.body.email,
		}).then(async (user) => {
			if (!user) {
				console.log("email not in database searching in doctor's table");
				Doctor.findOne({
					email: req.body.email
				}).then(async (doctor) => {
					if (!doctor) {
						return res.json({ Error: 'Cannot find this email' }).status(403);
					}
					else {
						const response = await helpers.forgotPassEmail("Doctor", req.body.email)
						console.log("response email", response)
						if (response == 'ok') {
							return res.status(200).json({ Email: req.body.email });
						}
						else {
							return res.json({ Error: 'There was an error!' }).status(400);
						}
					}
				})

			} else {
				const response = await helpers.forgotPassEmail("User", req.body.email)
				console.log("response email", response)
				if (response == 'ok') {
					return res.status(200).json({ Email: req.body.email });
				}
				else {
					return res.json({ Error: 'There was an error!' }).status(400);
				}
			}
		});
	});

	app.get('/auth/reset/:token', (req, res) => {
		const token = req.params.token;

		User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: {
				$gt: Date.now(), //Find time greater than date.Now() or > date.now
			},
		}).then(user => {
			if (!user) {
				console.log('password reset link is invalid or has expired');
				return res.send('password reset link is invalid or has expired').status(403);
			} else {
				// res.send({
				//   message: 'password reset link a-ok',
				// }).status(200);

				return res.redirect('docsahab://resetpassword');
				// return res.redirect('docsahab://resetPassword');
			}
		});
	});


};
