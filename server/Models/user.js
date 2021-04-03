const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
    doctor: Boolean,
    country: String,
    city: String,
    bio: String,
    contact: String,
    imgUrl: String,
    qualification: String,
    gender: String,
    profilePic: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  

}, { timestamps: { createdAt: 'dateOfJoin' } })

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

mongoose.model('users', userSchema);