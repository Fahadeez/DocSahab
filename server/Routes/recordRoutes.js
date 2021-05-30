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

	app.get('/api/get-a-patient-reports/:id', async (req, res) => {
		if (req.user) {
			let dirName = req.params.id;
			const adminbucket = admin.storage().bucket();

			adminbucket.getFiles({ prefix: 'files/' + dirName + '/' })
				.then((data) => {
					const fileNames = data[0].map(file => {
						return file.metadata
					})
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
