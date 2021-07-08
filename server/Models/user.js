const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const appointmentSchema = require('./appointmentModel')
const orderSchema = require('./orderModel')

const { Schema } = mongoose;

const userSchema = new Schema({

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
    appointments:[appointmentSchema],
    contact: String,
    imgUrl: String,
    qualification: String,
    gender: String,
    profilePic: String,
    reports: Array,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    orders: [orderSchema]
  

}, { timestamps: { createdAt: 'dateOfJoin' } })

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

mongoose.model('users', userSchema);