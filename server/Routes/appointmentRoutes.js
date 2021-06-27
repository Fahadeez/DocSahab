// const passport = require('passport');
const mongoose = require('mongoose');
// const express = require('express');
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');
// const stream = require('stream');
// const jwt = require('jsonwebtoken');
const moment = require('moment')
const nodemailer = require("nodemailer");
const keys = require("../Config/keys");

const User = mongoose.model('users');
const Doctor = mongoose.model('doctors');

const { join } = require('path');
const { client } = require('google-cloud-bucket');

const storage = client.new({
    jsonKeyFile: join(__dirname, './serviceAccountKeys.json'),
});
const bucket = 'e-tutor-9f2c2.appspot.com/';
const { v4: uuidv4 } = require('uuid');
// const storage = new Storage();
module.exports = app => {

    app.post('/api/book-appointment', async (req, res) => {
        if (req.body && req.user) {
            const { name, specialization, date, time, reason, docId, fees, accountNo, Bank } = req.body;
            console.log("book-appointments", req.body)
            const dateObj = new Date(date)
            const uniqueId = uuidv4();
            const doctor = await Doctor.findByIdAndUpdate(
                {
                    _id: docId
                },
                {
                    $push: {
                        appointments: {
                            date: moment(dateObj).format('DD/MM/YYYY'),
                            time: time,
                            reason: reason,
                            fees: fees,
                            patientId: req.user._id,
                            patientName: req.user.firstName + " " + req.user.lastName,
                            paymentAcknowlegment: false,
                            uniqueId
                        },
                    }

                }
            )
            doctor.save();
            const doctor2 = await Doctor.findByIdAndUpdate({
                _id: docId,
            }, {
                $push: {
                    patients: {
                        patientID: req.user._id,
                        patientName: req.user.firstName + " " + req.user.lastName
                    }
                }
            })

            doctor2.save();
            const user = await User.findByIdAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        appointments: {
                            doctorName: name,
                            doctorId: docId,
                            patientId: req.user._id,
                            patientName: req.user.firstName + " " + req.user.lastName,
                            specialization,
                            date: moment(dateObj).format('DD/MM/YYYY'),
                            time: time,
                            reason: reason,
                            paymentAcknowlegment: false,
                            fees: fees,
                            uniqueId,

                        },
                    },
                }
            )
            user.save();
            const admin = await User.findByIdAndUpdate(
                {
                    _id: '60d7134a12a758308a41c326'
                },
                {
                    $push: {
                        appointments: {
                            doctorName: name,
                            doctorId: docId,
                            patientId: req.user._id,
                            patientName: req.user.firstName + " " + req.user.lastName,
                            date: moment(dateObj).format('DD/MM/YYYY'),
                            time: time,
                            reason: reason,
                            fees: fees,
                            paymentAcknowlegment: false,
                            uniqueId,
                            doctorsAccNo: accountNo,
                            doctorsBank: Bank
                        },
                    }

                }
            )
            admin.save();
            let meetingID = Math.random().toString(36).substring(2);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'no.repy.docSahab@gmail.com',
                    pass: keys.gmailPass,
                },
            });
            const mailOptions = {
                from: 'no.repy.docSahab@gmail.com',
                to: `${req.user.email},${doctor.email}`,
                subject: 'Appointment confirmation',
                html: `<div> 
                <h4>Your appointment has been scheduled on Doc Sahab, Following are your appointment details,</h4>
                <h3>Please pay amount ${fees} to the following bank account and wait for the acknowlegment.</h3>
                <h2>Bank account details </h2>
                <h3>Bank name: Bank Al Habib</h3>
                <h3>Bank Account no: 332124-123151-12312</h3>

                <h2>Appointment details</h2>
                      <h3>Doctor: ${name}</h3>
                      <h3>Specialization: ${specialization}</h3>
                      <h3>Reason: ${reason}</h3>
                      <h3>Date: ${date}</h3>
                      <h3>Time: ${time} </h3>
                      <h3>Meeting room ID: ${meetingID}</h3>
                      <br>
                      <b>Note: Please join the meeting on provided date and time via meeting id </b>
                      </div>`,
            };

            console.log('sending mail');
            try {
                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.log('there was an error: ', err);
                        return res.json({ Error: 'There was an error!' }).status(400);
                    } else {
                        res.send('Appointment confirmed, Email sent').status(200);

                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    });

    app.get("/api/get-all-patients", async (req, res) => {
        if (req.user) {
            if (req.user.patients) {
                const patients = req.user.patients
                return res.send(patients).status(200)
            }
            else {
                return res.send("No patient available yet").status(400)
            }
        }
        else {
            return res.send("User not logged in").status(500)
        }

    });

    app.post('/api/change-payment-status', async (req, res) => {
        if (req.body && req.user) {
            console.log("/api/change-payment-status", req.body)
            const { patientId, doctorId, uniqueId } = req.body.data
            User.updateOne({ _id: patientId, "appointments.uniqueId": uniqueId }, {
                $set: {
                    "appointments.$.paymentAcknowlegment": req.body.status
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("User record updated")
                }
            })
            Doctor.updateOne({ _id: doctorId, "appointments.uniqueId": uniqueId }, {
                $set: {
                    "appointments.$.paymentAcknowlegment": req.body.status
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)

                }
                else {
                    console.log("Doctor record updated")
                }
            })
            User.updateOne({ _id: '60d7134a12a758308a41c326', "appointments.uniqueId": uniqueId }, {
                $set: {
                    "appointments.$.paymentAcknowlegment": req.body.status
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

    app.post('/api/save-prescription', async (req, res) => {
        if (req.body && req.user) {
            console.log("/api/save-prescription", req.body)
            const { patientId, doctorId, uniqueId, prescription } = req.body.data
            User.updateOne({ _id: patientId, "appointments.uniqueId": uniqueId }, {
                $set: {
                    "appointments.$.prescription": prescription
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("User record updated")
                }
            })
            Doctor.updateOne({ _id: doctorId, "appointments.uniqueId": uniqueId }, {
                $set: {
                    "appointments.$.prescription": prescription
                },
            }, function (err, resp) {
                if (err) {
                    console.log("err", err)
                }
                else {
                    console.log("Doctor record updated")
                    return res.send("Record updated").status(200)
                }
            })
        }
    });

    // app.get('/api/doctor/:id', async (req, res) => {
    //     const id = req.params.id;

    //     Doctor.findOne({
    //         _id: id,
    //     }).then(doctor => {
    //         if (!doctor) {
    //             console.log('doctor not found!');
    //             return res.send('doctor not found!').status(403);
    //         } else {
    //             console.log('doctor found!');
    //             return res.send(doctor).status(200);
    //         }
    //     });
    // });

    // app.post('/api/addLikedProfile', async (req, res) => {
    //     if (req.body && req.user) {
    //         const user = await User.findByIdAndUpdate(
    //             { _id: req.user._id },
    //             {
    //                 $push: {
    //                     likedProfiles: {
    //                         id: req.body.id,
    //                     },
    //                 },
    //             }
    //         );
    //         user.save();
    //         res.send('record updated').status(200);
    //     }
    // });

    // app.post('/api/removeLikedProfile', async (req, res) => {
    //     if (req.body && req.user) {
    //         const user = await User.findByIdAndUpdate(
    //             { _id: req.user._id },
    //             {
    //                 $pull: {
    //                     likedProfiles: {
    //                         id: req.body.id,
    //                     },
    //                 },
    //             }
    //         );
    //         user.save();
    //         res.send('record updated').status(200);
    //     }
    // });

    // app.get('/api/removeAllLikedProfiles', async (req, res) => {
    //     if (req.body && req.user) {
    //         const user = await User.findByIdAndUpdate(
    //             { _id: req.user._id },
    //             {
    //                 $set: {
    //                     likedProfiles: []
    //                 },
    //             }
    //         );
    //         user.save();
    //         res.send('ok').status(200);
    //     }
    // });

    // app.get('/api/getLikedProfiles', async (req, res) => {

    //     if (req.user) {
    //         User.findById({ _id: req.user._id }, async (err, user) => {
    //             if (err) {
    //                 console.log('Error finding user');
    //                 //return res.send('Error find user')
    //             } else {
    //                 console.log('user found, mapping array');
    //                 const idarr = user.likedProfiles.map(async profile => {
    //                     const ids = await User.findById({ _id: profile.id });
    //                     // console.log("ID: ",ids)
    //                     return ids;
    //                 });

    //                 // console.log("ID Array before: ", JSON.stringify(idarr))

    //                 Promise.all(idarr).then(list => {
    //                     // console.log("ID Array: ", list)
    //                     return res.send(list).status(200);
    //                 });
    //             }
    //         });
    //         //return res.send('record fetched').status(200);
    //     }
    //     console.log('User not logged in');
    //     //return res.send().status(400);
    // });

    // app.post('/api/select-doctor-with-name', async (req, res) => {
    //     const { limit } = req.query;
    //     const lim = parseInt(limit)
    //     const checkLim = lim === 0 ? 10 : lim

    //     const { name, filters } = req.body;
    //     let query = {};

    //     checkProperties = (obj) => {
    //         for (var key in obj) {
    //             if (obj[key] !== null && obj[key] != "")
    //                 return true;
    //         }
    //         return false;
    //     }

    //     if (name && filters) {
    //         const { gender, qualification, specialization, city } = req.body.filters;
    //         let condition = { firstName: name.toLowerCase() };

    //         if (gender) {
    //             condition.gender = gender;
    //         }
    //         if (qualification) {
    //             condition.qualification = qualification;
    //         }
    //         if (city) {
    //             condition.city = city;
    //         }
    //         if (specialization) {
    //             condition.specialization = specialization;
    //         }
    //         const query = Doctor.find(condition).limit(checkLim)
    //         query.exec((err, doctor) => {
    //             if (err) {
    //                 return res.send('Error in DB').status(400);
    //             }
    //             if (doctor) {
    //                 return res.send(doctor).status(200);
    //             }
    //         })
    //     } else if (name && !filters) {

    //         const query2 = Doctor.find({ firstName: name.toLowerCase() }).limit(checkLim)
    //         query2.exec((err, doctor) => {
    //             if (err) {
    //                 return res.send('Error in DB').status(400);
    //             }
    //             if (doctor) {
    //                 return res.send(doctor).status(200);
    //             }
    //         })
    //     } else if (!name && checkProperties(filters)) {
    //         // console.log("CHECK PROPERTIES: ", checkProperties(filters))

    //         console.log("Filters but not name")
    //         const { gender, qualification, city, specialization } = filters;

    //         // if (gender || qualification || country || state || city) {

    //         console.log("Filters in selectByName", filters)
    //         // const { gender, qualification, country, city, state } = req.body.filters;
    //         let condition = {};
    //         if (gender) {
    //             condition.gender = gender;
    //         }
    //         if (qualification) {
    //             condition.qualification = qualification;
    //         }
    //         if (city) {
    //             condition.city = city;
    //         }
    //         if (specialization) {
    //             condition.specialization = specialization;
    //         }
    //         const query3 = Doctor.find(condition).limit(checkLim)
    //         query3.exec((err, doctor) => {
    //             if (err) {
    //                 return res.send('Error in DB').status(400);
    //             }
    //             if (doctor) {
    //                 return res.send(doctor).status(200);
    //             }
    //         })
    //         // }

    //     } else {
    //         return res.redirect('/api/doctors?limit=10')
    //         // const { limit } = req.query;
    //         // const lim = parseInt(limit)
    //         // const query = User.find({ role: 'Tutor' }).sort({ _id: -1 }).limit()
    //         // query.exec((err, users) => {
    //         // 	if (err) {
    //         // 		console.log(err)
    //         // 		return r
    //         // es.send('Error in DB').status(400);
    //         // 	}
    //         // 	if (users) {
    //         // 		// console.log(users);
    //         // 		return res.send(users).status(200);
    //         // 	}
    //         // })
    //     }
    // });


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
