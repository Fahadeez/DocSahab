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

const { join } = require('path');
const { client } = require('google-cloud-bucket');

const storage = client.new({
    jsonKeyFile: join(__dirname, './serviceAccountKeys.json'),
});
const bucket = 'e-tutor-9f2c2.appspot.com/';

// const storage = new Storage();
module.exports = app => {

    app.post('/api/book-appointment', async (req, res) => {
        if (req.body && req.user) {
            const { name, specialization, date, time, reason } = req.body;
            const user = req.user;
            console.log("book-appointments",req.body)
            const dateObj = new Date(date)
            if(user.doctor){
                const doctor = await Doctor.findByIdAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            appointments: {
                                date: moment(dateObj).format('DD/MM/YYYY'),
                                time: time,
                                reason: reason,
                                // fees: '1000'
                            },
                        },
                    }
                )
                doctor.save();
                res.send('Appoitment confirmed').status(200);
            }
            else{
                const dateObj = new Date(date)
                const user = await User.findByIdAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            appointments: {
                                name,
                                specialization,
                                date: moment(dateObj).format('DD/MM/YYYY'),
                                time: time,
                                reason: reason,
                                // fees: '1000'
    
                            },
                        },
                    }
                )
                user.save();
                res.send('Appoitment confirmed').status(200);
            }
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
