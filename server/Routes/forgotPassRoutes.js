const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const keys = require('../Config/keys');
const bcrypt = require('bcrypt');

const User = mongoose.model('users');
const BCRYPT_SALT_ROUNDS = 10;
module.exports = app => {
	app.post('/auth/forgotPassword', (req, res) => {
		if (req.body.email === '') {
			return res.json({ Error: 'email required' }).status(400);
		}
		User.findOne({
			email: req.body.email,
		}).then(user => {
			if (!user) {
				console.log('email not in database');
				return res.json({ Error: 'Cannot find this email' }).status(403);
			} else {
				const token = crypto.randomBytes(20).toString('hex');
				User.updateOne(
					{ _id: user._id },
					{
						resetPasswordToken: token,
						resetPasswordExpires: Date.now() + 360000,
					}
				).then(user => {});
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'no.reply.teachinn@gmail.com',
						pass: keys.gmailPass,
					},
				});
				const mailOptions = {
					from: 'no.reply.teachinn@gmail.com',
					to: `${user.email}`,
					subject: 'Link To Reset Password',
					text:
						'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
						'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
						`http://192.168.0.106.xip.io:5000/auth/reset/${token}\n\n` +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n',
				};

				console.log('sending mail');
				try {
					transporter.sendMail(mailOptions, (err, response) => {
						if (err) {
							console.log('there was an error: ', err);
							return res.json({ Error: 'There was an error!' }).status(400);
						} else {
							return res.status(200).json({ Email: req.body.email });
						}
					});
				} catch (err) {
					console.log(err);
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

				return res.redirect('exp://192.168.56.1:19000/--/authNav/authNav/resetPassword');
			}
		});
	});

	app.post('/auth/updatePassword', (req, res) => {
		User.findOne({
			email: req.body.Email,
			//resetPasswordExpires: Date.now(),
		}).then(user => {
			if (!user) {
				console.log('user not found');
				return res.send('password reset link is invalid or has expired, Try again').status(403);
			} else {
				console.log('user found in db');
				bcrypt
					.hash(req.body.Password, BCRYPT_SALT_ROUNDS)
					.then(hashedPassword => {
						User.findByIdAndUpdate(
							{ _id: user._id },
							{
								password: hashedPassword,
							}
						).then(user => {
							user.save();
						});
					})

					.then(() => {
						res.send('ok').status(200);
					});
			}
		});
	});

	app.post('/auth/changePassword', (req, res) => {
		const { currentPassword, newPassword, Email } = req.body;
		User.findOne({
			email: Email,
			//resetPasswordExpires: Date.now(),
		}).then(async user => {
			if (!user) {
				console.log('user not found');
				return res.send('password reset link is invalid or has expired, Try again').status(403);
			} else {
				console.log('user found in db');
        const passMatch = user.comparePassword(currentPassword, user.password);
				if (passMatch) {
					const hashedPass = user.hashPassword(newPassword);
					User.findByIdAndUpdate(
						{ _id: user._id },
						{
							password: hashedPass,
						}
					)
						.then(user => {
							user.save();
						})
						.then(() => {
							console.log('password updated');
							res.send('ok').status(200);
						});
				} else {
					console.log('Wrong current password');
					return res.send('Wrong current password!').status(403);
				}
			}
		});
		
	});
};
