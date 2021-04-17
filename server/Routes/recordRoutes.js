// const passport = require('passport');
const mongoose = require('mongoose');
// const express = require('express');
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');
// const stream = require('stream');
// const jwt = require('jsonwebtoken');
const multer = require('multer')

const User = mongoose.model('users');
const Doctor = mongoose.model('doctors');

const { join } = require('path');
const { client } = require('google-cloud-bucket');

// const storage = client.new({
// 	jsonKeyFile: join(__dirname, './serviceAccountKeys.json'),
// });

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
	}
})

// const storage = new Storage();
module.exports = app => {


	app.post('/api/upload-report', upload.single('file'), async (req, res) => {

		if (!req.file || !req.user) {
			res.status(400).send("Error: No files found")
		} else {
			const adminbucket = admin.storage().bucket();
			const blob = adminbucket.file('files/' + req.user._id + '/' + req.file.originalname)

			const blobWriter = blob.createWriteStream({
				metadata: {
					contentType: req.file.mimetype
				}
			})

			blobWriter.on('error', (err) => {
				console.log(err)
			})

			blobWriter.on('finish', async () => {
				res.status(200).send("File uploaded.")
				// const url = await blob.getSignedUrl({
				// 	action: 'read',
				// 	expires: '03-09-2491',
				// });

				// const result = await User.findByIdAndUpdatel (
				// 	{ _id: req.user._id },
				// 	{
				// 		reports: url[0],
				// 	}
				// );
				// result.save((err, user) => {
				// 	if (err) {
				// 		console.log('Error in storing url to db');
				// 		res.send({ error: 'Erorr' }).status(200);
				// 	} else {
				// 		console.log('Image uploaded to firebase');
				// 		console.log('url saved in db');
				// 		return res.send().status(200);
				// 	}
				// });

			})

			blobWriter.end(req.file.buffer)
		}
		// 	// Convert the base64 string back to an image to upload into the Google Cloud Storage bucket
		// 	var base64EncodedImageString = imageBase64,
		// 		mimeType = 'image/jpeg',
		// 		fileName = req.user._id + new Date(),
		// 		imageBuffer = new Buffer(base64EncodedImageString, 'base64');
		// 	// Upload the image to the bucket
		// 	storage.exists(bucket + 'profile-images/' + req.user._id + '/').then(async exists => {
		// 		if (exists) {
		// 			const adminbucket = admin.storage().bucket();
		// 			var file = adminbucket.file('profile-images/' + req.user._id + '/');

		// 			console.log('File already exist');

		// 			let dirName = req.user._id;
		// 			adminbucket.deleteFiles({ prefix: 'profile-images/' + dirName + '/', force: true }, async (err) => {
		// 				if (err) {

		// 					res.send({ error: 'Error,Try again' }).status(200);
		// 				}
		// 				if (!err) {
		// 					const delImgUrl = await User.findByIdAndUpdate({ _id: req.user._id }, { imgUrl: '' });
		// 					console.log('File has been deleted!');
		// 					storage
		// 						.insert(
		// 							imageBuffer,
		// 							bucket + 'profile-images/' + req.user._id + '/' + fileName + '.jpg',
		// 							{ timeout: 30000 }
		// 						)
		// 						.then(async () => {
		// 							const Gstorage = new Storage({
		// 								projectId: 'e-tutor-9f2c2',
		// 								credentials: require('../Config/serviceAccountKeys.json'),
		// 							});
		// 							Gstorage.interceptors.push({
		// 								request: reqOpts => {
		// 									reqOpts.forever = true;
		// 									return reqOpts;
		// 								},
		// 							});
		// 							const Sbucket = Gstorage.bucket('e-tutor-9f2c2.appspot.com/');

		// 							const Bfile = Sbucket.file(
		// 								'profile-images/' + req.user._id + '/' + fileName + '.jpg'
		// 							);

		// 							console.log('User found, uploading img url');
		// 							const url = await Bfile.getSignedUrl({
		// 								action: 'read',
		// 								expires: '03-09-2491',
		// 								content_type: 'image/jpeg',
		// 							});

		// 							const result = await User.findByIdAndUpdate(
		// 								{ _id: req.user._id },
		// 								{
		// 									imgUrl: url[0],
		// 								}
		// 							);
		// 							result.save((err, user) => {
		// 								if (err) {
		// 									console.log('Error in storing url to db');
		// 									res.send({ error: 'Erorr' }).status(200);
		// 								} else {
		// 									console.log('Image uploaded to firebase');
		// 									console.log('url saved in db');
		// 									return res.send().status(200);
		// 								}
		// 							});
		// 						}).catch(() => {
		// 							console.log("Error storing img")
		// 							res.send({ error: 'Error,Try again' }).status(200);
		// 						})
		// 				}
		// 			})

		// 		} else {
		// 			const delImgUrl = await User.findByIdAndUpdate({ _id: req.user._id },
		// 				{ imgUrl: '' });
		// 			console.log('File has been deleted!');
		// 			storage
		// 				.insert(imageBuffer, bucket + 'profile-images/' + req.user._id + '/' + fileName + '.jpg', {
		// 					timeout: 30000,
		// 				})
		// 				.then(async err => {
		// 					const Gstorage = new Storage({
		// 						projectId: 'e-tutor-9f2c2',
		// 						credentials: require('../Config/serviceAccountKeys.json'),
		// 					});
		// 					Gstorage.interceptors.push({
		// 						request: reqOpts => {
		// 							reqOpts.forever = true;
		// 							return reqOpts;
		// 						},
		// 					});

		// 					const Sbucket = Gstorage.bucket('e-tutor-9f2c2.appspot.com/');

		// 					const Bfile = Sbucket.file('profile-images/' + req.user._id + '/' + fileName + '.jpg');
		// 					console.log('User found, uploading img url');
		// 					const url = await Bfile.getSignedUrl({
		// 						action: 'read',
		// 						expires: '03-09-2491',
		// 						content_type: 'image/jpeg',
		// 					});

		// 					const result = await User.findByIdAndUpdate(
		// 						{ _id: req.user._id },
		// 						{
		// 							imgUrl: url[0],
		// 						}
		// 					);
		// 					result.save((err, user) => {
		// 						if (err) {
		// 							console.log('Error in storing url to db');
		// 							res.send({ error: 'Error,Try again' }).status(200);
		// 						} else {
		// 							console.log('Image uploaded to firebase');
		// 							console.log('url saved in db');
		// 							return res.send().status(200);
		// 						}
		// 					});
		// 				}).catch(() => {
		// 					console.log("Error storing img")
		// 					res.send({ error: 'Error,Try again' }).status(200)
		// 				})
		// 		}

		// 	}).catch(() => {
		// 		console.log("Error finding img")

		// 		res.send({ error: 'Error,Try again' }).status(200)

		// 	})

		// }

		// if (bio && req.user) {
		// 	condition.bio = bio;
		// 	User.findByIdAndUpdate({ _id: req.user._id }, { bio }).then(user => {
		// 		user.save((err, user) => {
		// 			if (err) {
		// 				console.log('Error in storing bio to db');
		// 			} else {
		// 				console.log('bio saved in db');
		// 				if (imageBase64) {
		// 					return
		// 				}
		// 				res.send().status(200);

		// 			}
		// 		});
		// 	});
		// }
		// if (qualification && req.user) {
		// 	condition.qualification = qualification;
		// 	User.findByIdAndUpdate({ _id: req.user._id }, { qualification }).then(user => {
		// 		user.save((err, user) => {
		// 			if (err) {
		// 				console.log('Error in storing qualification to db');
		// 			} else {
		// 				console.log('qualification saved in db');
		// 				if (imageBase64) {
		// 					return
		// 				}
		// 				res.send().status(200);
		// 			}
		// 		});
		// 	});
		// }
	});
	app.post('/api/delete-report', async (req, res) => {
		if (req.user) {
			const adminbucket = admin.storage().bucket();
			let dirName = req.user._id;
			adminbucket.deleteFiles({ prefix: 'files/' + dirName + '/' + req.body.fileName })
				.then(() => {
					console.log("file deleted")
					return res.send("File deleted successfully")
				}).catch((err) => {
					console.log(err)
					res.send({ error: 'Error,Try again' }).status(400);
				})
		}
		else {
			res.send("User must log in!")
		}

	})

	app.get('/api/get-all-reports', async (req, res) => {
		if (req.user) {
			let dirName = req.user._id;
			const adminbucket = admin.storage().bucket();

			adminbucket.getFiles({ prefix: 'files/' + dirName + '/' })
				.then((data) => {
					const fileNames = data[0].map(file => {
						return file.metadata
					})
					console.log("fileNames", fileNames)
					return res.send(fileNames).status(200)
				}).catch((err) => {
					console.log(err)
					res.send({ error: 'Error,Try again' }).status(400);
				})
		}
		else {
			res.send("User must log in!")
		}
	})


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
