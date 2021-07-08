const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const appointmentSchema = require('./appointmentModel');
const patientSchema = require('./patientsModel');
const orderSchema = require('./orderModel')

const { Schema } = mongoose;

const doctorSchema = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    address: String,
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
    regNo: String,
    accountNo: String,
    Bank: String,
    fees: String,
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
    orders: {orderSchema}

}, { timestamps: { createdAt: 'dateOfJoin' } })

doctorSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
doctorSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

mongoose.model('doctors', doctorSchema);