const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const likedProfileSchema = require('./likedProfiles');
const ratedBySchema = require('./ratedBy')
const { Schema } = mongoose;

const doctorSchema = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
    role: String,
    country: String,
    city: String,
    bio: String,
    contact: String,
    imgUrl: String,
    qualification: String,
    gender: String,
    profilePic: String,
    stars: Number,
    rating: Number,
    noOfReviews: { type: Number, default: 0 },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    likedProfiles: [likedProfileSchema],
    ratedBy: [ratedBySchema]

}, { timestamps: { createdAt: 'dateOfJoin' } })

doctorSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
doctorSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

mongoose.model('doctors', doctorSchema);