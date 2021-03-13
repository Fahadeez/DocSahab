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

const User = mongoose.model('users');
const Doctor = mongoose.model('doctors');


module.exports = app => {

	// for doc pms code verification api
	app.post('/auth/getPMCRegCode', async (req, res) => {
		const { reg_no } = req.body;
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

				return res.send("Doctor's record exists").status(200)
			}
			else {

				return res.send("No record found").status(400)
			}

		}
		catch (err) {
			console.log(err)
			return res.send("Error").status(500)
		}
	});

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

		if (role === "doctor") {
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
							record.role = role.trim();
							record.password = record.hashPassword(password.trim());
							record.save(function (err, user) {
								if (err) {
									return res.send('db error').status(400);
								} else {
									return res.send("Doctor's data added").status(200);
								}
							});
						}

					}
				}
			);
		}
		if (role === "user") {

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
							record.role = role.trim();
							record.password = record.hashPassword(password.trim());
							record.save(function (err, user) {
								if (err) {
									return res.send('db error').status(400);
								} else {
									return res.send("User's data added").status(200);
								}
							});
						}

					}
				}
			);
		}

	});




	app.get('/auth/current_user', (req, res) => {
		res.send(req.user).status(200);
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





	// app.post('/auth/signInAsTutor', async (req, res) => {
	// 	console.log("req.body /auth/signInAsTutor", req.body)
	// 	const { image } = req.body;
	// 	let { gender, bio, qualification, contact } = req.body.values;
	// 	let { country, province, city } = req.body;
	// 	const d = Date();
	// 	let date = d.toString();


	// 	if (req.body.data) {
	// 		const record = new User();

	// 		let { firstName, lastName, email, cPassword, password, role } = req.body.data;
	// 		record.email = email.trim();
	// 		record.firstName = firstName.trim();
	// 		record.lastName = lastName.trim();
	// 		record.role = role.trim();
	// 		record.password = record.hashPassword(password.trim());
	// 		record.gender = gender.trim();
	// 		record.bio = bio.trim();
	// 		record.qualification = qualification.trim();
	// 		record.contact = contact.trim();
	// 		record.country = country.trim();
	// 		record.city = city.trim();
	// 		record.province = province.trim();
	// 		record.save(async function (err, user) {
	// 			if (err) {
	// 				console.log(err)
	// 				return res.send('db error').status(400);
	// 			} else {
	// 				if (image) {
	// 					// Convert the base64 string back to an image to upload into the Google Cloud Storage bucket
	// 					var base64EncodedImageString = image,
	// 						mimeType = 'image/jpeg',
	// 						fileName = user._id,
	// 						imageBuffer = new Buffer(base64EncodedImageString, 'base64');

	// 					// Upload the image to the bucket
	// 					const bucket = admin.storage().bucket();
	// 					var file = bucket.file('profile-images/' + fileName);
	// 					file.save(
	// 						imageBuffer,
	// 						{
	// 							metadata: { contentType: mimeType },
	// 						},
	// 						async error => {
	// 							if (error) {
	// 								console.log('Image upload error', error);
	// 								return res.json({ error: 'Image upload error' }).status(401);
	// 							} else {
	// 								const Gstorage = new Storage({
	// 									projectId: 'e-tutor-9f2c2',
	// 									credentials: require('../Config/serviceAccountKeys.json'),
	// 								});
	// 								//creating signed url
	// 								const Sbucket = Gstorage.bucket('gs://e-tutor-9f2c2.appspot.com/');

	// 								const Bfile = Sbucket.file('profile-images/' + fileName);

	// 								if (!user.imgUrl) {
	// 									const url = await Bfile.getSignedUrl({
	// 										action: 'read',
	// 										expires: '03-09-2491',
	// 										content_type: 'image/jpeg',
	// 									});

	// 									const result = await User.findByIdAndUpdate(
	// 										{ _id: user._id },
	// 										{
	// 											imgUrl: url[0],
	// 										}
	// 									);

	// 									result.save((err, user) => {
	// 										if (err) {
	// 											console.log('Error in storing url to db');
	// 										} else {
	// 											console.log('Image uploaded to firebase');
	// 											console.log('url saved in db');
	// 											return res.send().status(200);
	// 										}
	// 									});
	// 								}
	// 							}
	// 						}
	// 					);
	// 				}
	// 				else {
	// 					console.log("Tutor's profile has been created!")
	// 					return res.send().status(200);
	// 				}
	// 			}
	// 		});
	// 	}

	// 	if (req.body.data === null) {
	// 		console.log("req.user signinAsTutor", req.user)
	// 		if (req.user) {

	// 			const user = await User.findByIdAndUpdate(
	// 				{
	// 					_id: req.user._id,
	// 				}, { gender, bio, qualification, contact, country, province, city }
	// 			)
	// 			user.save()

	// 			if (image) {
	// 				// Convert the base64 string back to an image to upload into the Google Cloud Storage bucket
	// 				var base64EncodedImageString = image,
	// 					mimeType = 'image/jpeg',
	// 					fileName = user._id,
	// 					imageBuffer = new Buffer(base64EncodedImageString, 'base64');

	// 				// Upload the image to the bucket
	// 				const bucket = admin.storage().bucket();
	// 				var file = bucket.file('profile-images/' + fileName);
	// 				file.save(
	// 					imageBuffer,
	// 					{
	// 						metadata: { contentType: mimeType },
	// 					},
	// 					async error => {
	// 						if (error) {
	// 							console.log('Image upload error', error);
	// 							return res.json({ error: 'Image upload error' }).status(401);
	// 						} else {
	// 							const Gstorage = new Storage({
	// 								projectId: 'e-tutor-9f2c2',
	// 								credentials: require('../Config/serviceAccountKeys.json'),
	// 							});
	// 							//creating signed url
	// 							const Sbucket = Gstorage.bucket('gs://e-tutor-9f2c2.appspot.com/');

	// 							const Bfile = Sbucket.file('profile-images/' + fileName);

	// 							if (!user.imgUrl) {
	// 								const url = await Bfile.getSignedUrl({
	// 									action: 'read',
	// 									expires: '03-09-2491',
	// 									content_type: 'image/jpeg',
	// 								});

	// 								const result = await User.findByIdAndUpdate(
	// 									{ _id: user._id },
	// 									{
	// 										imgUrl: url[0],
	// 									}
	// 								);

	// 								result.save((err, user) => {
	// 									if (err) {
	// 										console.log('Error in storing url to db');
	// 									} else {
	// 										console.log('Image uploaded to firebase');
	// 										console.log('url saved in db');
	// 										return res.send().status(200);
	// 									}
	// 								});
	// 							}
	// 						}
	// 					}
	// 				);
	// 			}
	// 			else {
	// 				console.log("Tutor's profile has been created!")
	// 				return res.send().status(200);
	// 			}
	// 		}
	// 	}

	// });


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

	// app.post('/auth/f', (req, res) => {
	// 	console.log('/auth/forgotPass req.body: ', req.body);
	// 	console.log(req.body.email);
	// 	User.findOne({
	// 		email: req.body.email,
	// 	}).then(user => {
	// 		if (!user) {
	// 			console.log('email not in database');
	// 			return res.json({ Error: 'Cannot find this email' }).status(403);
	// 		} else {
	// 			const token = crypto.randomBytes(20).toString('hex');
	// 			User.updateOne(
	// 				{ _id: user._id },
	// 				{
	// 					resetPasswordToken: token,
	// 					resetPasswordExpires: Date.now() + 360000,
	// 				}
	// 			).then(user => {});
	// 			const transporter = nodemailer.createTransport({
	// 				service: 'gmail',
	// 				auth: {
	// 					user: 'fahadeez.paki@gmail.com',
	// 					pass: keys.gmailPass,
	// 				},
	// 			});
	// 			const mailOptions = {
	// 				from: 'fahadeez.paki@gmail.com',
	// 				to: `${user.email}`,
	// 				subject: 'Link To Reset Password',
	// 				text:
	// 					'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
	// 					'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
	// 					`http://192.168.10.7.xip.io:5000/auth/reset/${token}\n\n` +
	// 					'If you did not request this, please ignore this email and your password will remain unchanged.\n',
	// 			};

	// 			console.log('sending mail');
	// 			try {
	// 				transporter.sendMail(mailOptions, (err, response) => {
	// 					if (err) {
	// 						console.log('there was an error: ', err);
	// 						return res.json({ Error: 'There was an error!' }).status(400);
	// 					} else {
	// 						console.log('here is the res: ', response);
	// 						return res.status(200).json({ Email: req.body.email });
	// 					}
	// 				});
	// 			} catch (err) {
	// 				console.log(err);
	// 			}
	// 		}
	// 	});
	// });

};
