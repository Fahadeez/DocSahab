const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const likedProfileSchema = require('./likedProfiles');
const ratedBySchema = require('./ratedBy')
const appointmentSchema = require('./appointmentModel');
const patientSchema = require('./patientsModel');

const { Schema } = mongoose;

const doctorSchema = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
    doctor: Boolean,
    country: String,
    city: String,
    bio: String,
    yearsOfExp: String,
    specialization: String,
    days: Array,
    timeSlots: Array,
    startCheckupTime: String,
    endCheckupTime: String,
    appointments: [appointmentSchema],
    contact: String,
    imgUrl: String,
    qualification: String,
    gender: String,
    profilePic: String,
    stars: Number,
    rating: Number,
    patients: [patientSchema],
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