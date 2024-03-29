// const passport = require('passport');
const mongoose = require('mongoose');
// const express = require('express');
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');
// const stream = require('stream');
// const jwt = require('jsonwebtoken');
const moment = require('moment')
const User = mongoose.model('users');
const Doctor = mongoose.model('doctors');
const Order = mongoose.model('orders');


const { join } = require('path');
const { client } = require('google-cloud-bucket');

const storage = client.new({
	jsonKeyFile: join(__dirname, './serviceAccountKeys.json'),
});
const { v4: uuidv4 } = require('uuid');
const bucket = 'e-tutor-9f2c2.appspot.com/';


// const storage = new Storage();
module.exports = app => {

	app.get('/api/doctors', async (req, res) => {
		const { limit } = req.query;
		const lim = parseInt(limit)
		const checkLim = lim === 0 ? 10 : lim
		const query = Doctor.find({}).sort({ _id: -1 }).limit(checkLim)
		query.exec((err, doctor) => {
			if (err) {
				console.log(err)
				return res.send('Error in DB').status(400);
			}
			if (doctor) {
				// console.log(doctor);
				return res.send(doctor).status(200);
			}
		})
	});

	app.get('/api/doctor/:id', async (req, res) => {
		const id = req.params.id;

		Doctor.findOne({
			_id: id,
		}).then(doctor => {
			if (!doctor) {
				console.log('doctor not found!');
				return res.send('doctor not found!').status(403);
			} else {
				console.log('doctor found!');
				return res.send(doctor).status(200);
			}
		});
	});

	app.post('/api/order-details', async (req, res) => {
		console.log("/api/order-details", req.body);
		if (req.body && req.user) {
			const { userName, subTotal, paymentMethod, products } = req.body;
			const order = new Order();
			order.subTotal = subTotal;
			order.paymentMethod = paymentMethod;
			order.products = products;
			order.userId = req.user._id;
			order.userName = req.user.firstName + " " + req.user.lastName;
			order.date = JSON.stringify(moment());
			order.uId = uuidv4();
			order.alert = null;
			order.reason = null;
			order.save().then((resp) => {
				if (resp) {
					return res.send("Order saved successfully").status(200);
				} else {
					return res.send("db error").status(400);
				}
			});

			const uniqueId = uuidv4();
			const alert = null;
			const reason = null;
			const user = await User.findByIdAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        orders: {
                            subTotal: subTotal,
							paymentMethod: paymentMethod,
							products: products,
							userId: req.user._id,
							date: JSON.stringify(moment()),
							status: false,
							uId: uniqueId,
							alert,
							reason

                        },
                    },
                }
            )

            const admin = await User.findByIdAndUpdate(
                {
                    _id: '60d7134a12a758308a41c326'
                },
                {
                    $push: {
                        orders: {
                            subTotal: subTotal,
							paymentMethod: paymentMethod,
							products: products,
							userName: req.user.firstName + " " + req.user.lastName,
							userId: req.user._id,
							date: JSON.stringify(moment()),
							status: false,
							uId: uniqueId,
							alert,
							reason
		                }
		            }
		        }
            )
            admin.save();
		}
	});

	app.post("/api/update-docProfile", async (req, res) => {
		console.log("/api/update-docProfile", req.body.data)
		const { specialization, qualification, newDays, startTime, endTime, yearsOfExp, bank, account_no, fees } = req.body.data;
		if (req.body.data && req.user) {
			const doctor = await Doctor.findByIdAndUpdate(
				{
					_id: req.user._id,
				},
				{
					specialization,
					qualification,
					days: newDays,
					startCheckupTime: moment(startTime).toDate(),
					endCheckupTime: moment(endTime).toDate(),
					yearsOfExp,
					Bank: bank,
					accountNo: account_no,
					fees,
				}
			);
			doctor.save();
			return res.send("Doctor's details updated").status(200)
		}
	})
	app.post('/api/change-order-payment-status', async (req, res) => {
        if (req.body && req.user) {
            console.log("/api/change-payment-status", req.body)
            const { userId, uId } = req.body.data
            User.updateOne({ _id: userId, "orders.uId": uId }, {
                $set: {
                    "orders.$.status": req.body.status
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("User record updated")
                }
            })
            
            User.updateOne({ _id: '60d7134a12a758308a41c326', "orders.uId": uId }, {
                $set: {
                    "orders.$.status": req.body.status
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("Admin record updated")
                    return res.send("Record updated").status(200)
                }
            })
        }
    });

    app.post('/api/change-address', async (req, res) => {
        if (req.body && req.user) {
            const _id = req.body._id
            const doctor = req.body.doctor
            if(doctor === false){
            	User.updateOne({ _id: _id}, {
                $set: {
                    "address": req.body.address
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("User address updated");
                }
            })
          	}

          	else{
          		Doctor.updateOne({ _id: _id}, {
                $set: {
                    "address": req.body.address
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("Doctor address updated")
                }
            })
          	}
            
        }
    });

    app.post('/api/cancel-order', async (req, res) => {
        if (req.body && req.user) {
            const { userId, uId } = req.body.data
            User.updateOne({ _id: userId, "orders.uId": uId }, {
                $set: {
                    "orders.$.alert": req.body.alert,
                    "orders.$.reason": req.body.reason,
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("User record updated")
                }
            })
            
            User.updateOne({ _id: '60d7134a12a758308a41c326', "orders.uId": uId }, {
                $set: {
                    "orders.$.alert": req.body.alert,
                    "orders.$.reason": req.body.reason,
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    return res.send("Record updated").status(200)
                }
            })
        }
    });


	app.post('/api/select-doctor-with-name', async (req, res) => {
		const { limit } = req.query;
		const lim = parseInt(limit)
		const checkLim = lim === 0 ? 10 : lim

		const { name, filters } = req.body;
		let query = {};

		checkProperties = (obj) => {
			for (var key in obj) {
				if (obj[key] !== null && obj[key] != "")
					return true;
			}
			return false;
		}

		if (name && filters) {
			const { gender, qualification, specialization, city } = req.body.filters;
			let condition = { firstName: name.toLowerCase() };

			if (gender) {
				condition.gender = gender;
			}
			if (qualification) {
				condition.qualification = qualification;
			}
			if (city) {
				condition.city = city;
			}
			if (specialization) {
				condition.specialization = specialization;
			}
			const query = Doctor.find(condition).limit(checkLim)
			query.exec((err, doctor) => {
				if (err) {
					return res.send('Error in DB').status(400);
				}
				if (doctor) {
					return res.send(doctor).status(200);
				}
			})
		} else if (name && !filters) {

			const query2 = Doctor.find({ firstName: name.toLowerCase() }).limit(checkLim)
			query2.exec((err, doctor) => {
				if (err) {
					return res.send('Error in DB').status(400);
				}
				if (doctor) {
					return res.send(doctor).status(200);
				}
			})
		} else if (!name && checkProperties(filters)) {
			// console.log("CHECK PROPERTIES: ", checkProperties(filters))

			console.log("Filters but not name")
			const { gender, qualification, city, specialization } = filters;

			// if (gender || qualification || country || state || city) {

			console.log("Filters in selectByName", filters)
			// const { gender, qualification, country, city, state } = req.body.filters;
			let condition = {};
			if (gender) {
				condition.gender = gender;
			}
			if (qualification) {
				condition.qualification = qualification;
			}
			if (city) {
				condition.city = city;
			}
			if (specialization) {
				condition.specialization = specialization;
			}
			const query3 = Doctor.find(condition).limit(checkLim)
			query3.exec((err, doctor) => {
				if (err) {
					return res.send('Error in DB').status(400);
				}
				if (doctor) {
					return res.send(doctor).status(200);
				}
			})
			// }

		} else {
			return res.redirect('/api/doctors?limit=10')
			// const { limit } = req.query;
			// const lim = parseInt(limit)
			// const query = User.find({ role: 'Tutor' }).sort({ _id: -1 }).limit()
			// query.exec((err, users) => {
			// 	if (err) {
			// 		console.log(err)
			// 		return r
			// es.send('Error in DB').status(400);
			// 	}
			// 	if (users) {
			// 		// console.log(users);
			// 		return res.send(users).status(200);
			// 	}
			// })
		}
	});


	// app.post('/api/updateProfile', async (req, res) => {
	// 	const { bio, qualification, imageBase64 } = req.body.data;
	// 	let condition = {}


	// 	if (imageBase64 && req.user) {
	// 		// Convert the base64 string back to an image to upload into the Google Cloud Storage bucket
	// 		var base64EncodedImageString = imageBase64,
	// 			mimeType = 'image/jpeg',
	// 			fileName = req.user._id + new Date(),
	// 			imageBuffer = new Buffer(base64EncodedImageString, 'base64');
	// 		// Upload the image to the bucket
	// 		storage.exists(bucket + 'profile-images/' + req.user._id + '/').then(async exists => {
	// 			if (exists) {
	// 				const adminbucket = admin.storage().bucket();
	// 				var file = adminbucket.file('profile-images/' + req.user._id + '/');

	// 				console.log('File already exist');

	// 				let dirName = req.user._id;
	// 				adminbucket.deleteFiles({ prefix: 'profile-images/' + dirName + '/', force: true }, async (err) => {
	// 					if (err) {

	// 						res.send({ error: 'Error,Try again' }).status(200);
	// 					}
	// 					if (!err) {
	// 						const delImgUrl = await User.findByIdAndUpdate({ _id: req.user._id }, { imgUrl: '' });
	// 						console.log('File has been deleted!');
	// 						storage
	// 							.insert(
	// 								imageBuffer,
	// 								bucket + 'profile-images/' + req.user._id + '/' + fileName + '.jpg',
	// 								{ timeout: 30000 }
	// 							)
	// 							.then(async () => {
	// 								const Gstorage = new Storage({
	// 									projectId: 'e-tutor-9f2c2',
	// 									credentials: require('../Config/serviceAccountKeys.json'),
	// 								});
	// 								Gstorage.interceptors.push({
	// 									request: reqOpts => {
	// 										reqOpts.forever = true;
	// 										return reqOpts;
	// 									},
	// 								});
	// 								const Sbucket = Gstorage.bucket('e-tutor-9f2c2.appspot.com/');

	// 								const Bfile = Sbucket.file(
	// 									'profile-images/' + req.user._id + '/' + fileName + '.jpg'
	// 								);

	// 								console.log('User found, uploading img url');
	// 								const url = await Bfile.getSignedUrl({
	// 									action: 'read',
	// 									expires: '03-09-2491',
	// 									content_type: 'image/jpeg',
	// 								});

	// 								const result = await User.findByIdAndUpdate(
	// 									{ _id: req.user._id },
	// 									{
	// 										imgUrl: url[0],
	// 									}
	// 								);
	// 								result.save((err, user) => {
	// 									if (err) {
	// 										console.log('Error in storing url to db');
	// 										res.send({ error: 'Erorr' }).status(200);
	// 									} else {
	// 										console.log('Image uploaded to firebase');
	// 										console.log('url saved in db');
	// 										return res.send().status(200);
	// 									}
	// 								});
	// 							}).catch(() => {
	// 								console.log("Error storing img")
	// 								res.send({ error: 'Error,Try again' }).status(200);
	// 							})
	// 					}
	// 				})

	// 			} else {
	// 				const delImgUrl = await User.findByIdAndUpdate({ _id: req.user._id },
	// 					{ imgUrl: '' });
	// 				console.log('File has been deleted!');
	// 				storage
	// 					.insert(imageBuffer, bucket + 'profile-images/' + req.user._id + '/' + fileName + '.jpg', {
	// 						timeout: 30000,
	// 					})
	// 					.then(async err => {
	// 						const Gstorage = new Storage({
	// 							projectId: 'e-tutor-9f2c2',
	// 							credentials: require('../Config/serviceAccountKeys.json'),
	// 						});
	// 						Gstorage.interceptors.push({
	// 							request: reqOpts => {
	// 								reqOpts.forever = true;
	// 								return reqOpts;
	// 							},
	// 						});

	// 						const Sbucket = Gstorage.bucket('e-tutor-9f2c2.appspot.com/');

	// 						const Bfile = Sbucket.file('profile-images/' + req.user._id + '/' + fileName + '.jpg');
	// 						console.log('User found, uploading img url');
	// 						const url = await Bfile.getSignedUrl({
	// 							action: 'read',
	// 							expires: '03-09-2491',
	// 							content_type: 'image/jpeg',
	// 						});

	// 						const result = await User.findByIdAndUpdate(
	// 							{ _id: req.user._id },
	// 							{
	// 								imgUrl: url[0],
	// 							}
	// 						);
	// 						result.save((err, user) => {
	// 							if (err) {
	// 								console.log('Error in storing url to db');
	// 								res.send({ error: 'Error,Try again' }).status(200);
	// 							} else {
	// 								console.log('Image uploaded to firebase');
	// 								console.log('url saved in db');
	// 								return res.send().status(200);
	// 							}
	// 						});
	// 					}).catch(() => {
	// 						console.log("Error storing img")
	// 						res.send({ error: 'Error,Try again' }).status(200)
	// 					})
	// 			}

	// 		}).catch(() => {
	// 			console.log("Error finding img")

	// 			res.send({ error: 'Error,Try again' }).status(200)

	// 		})

	// 	}

	// 	if (bio && req.user) {
	// 		condition.bio = bio;
	// 		User.findByIdAndUpdate({ _id: req.user._id }, { bio }).then(user => {
	// 			user.save((err, user) => {
	// 				if (err) {
	// 					console.log('Error in storing bio to db');
	// 				} else {
	// 					console.log('bio saved in db');
	// 					if (imageBase64) {
	// 						return
	// 					}
	// 					res.send().status(200);

	// 				}
	// 			});
	// 		});
	// 	}
	// 	if (qualification && req.user) {
	// 		condition.qualification = qualification;
	// 		User.findByIdAndUpdate({ _id: req.user._id }, { qualification }).then(user => {
	// 			user.save((err, user) => {
	// 				if (err) {
	// 					console.log('Error in storing qualification to db');
	// 				} else {
	// 					console.log('qualification saved in db');
	// 					if (imageBase64) {
	// 						return
	// 					}
	// 					res.send().status(200);
	// 				}
	// 			});
	// 		});
	// 	}
	// });

	// app.post('/api/updateRating', async (req, res) => {
	// 	const { stars, id } = req.body

	// 	if (req.user && stars) {

	// 		const user = await User.findByIdAndUpdate({ _id: id }, { $inc: { noOfReviews: 1, stars } })

	// 		const user2 = await User.findById({ _id: id })
	// 		if (!user2) {
	// 			console.log('User not found');
	// 		} else {

	// 			//const mulby5 = user2.noOfReviews <= 0 ? 1 : user2.noOfReviews
	// 			//console.log("mulby5", mulby5)
	// 			const meanScore = user2.stars / (user2.noOfReviews * 5)
	// 			const score = meanScore * 100
	// 			const averageRating = score / 20
	// 			const rating = Number(averageRating).toFixed(1)

	// 			const updateRating = await user2.updateOne({ $set: { rating } })
	// 			const updateRatedBy = await user2.updateOne({ $push: { ratedBy: { id: req.user._id } } })
	// 			res.send().status(200);
	// 		}


	// 	}
	// });

};
