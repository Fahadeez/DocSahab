const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = Schema({
    
    patientId: String,
    doctorId: String,
    patientName: String,
    doctorName: String,
    specialization: String,
    date: String,
    time: String,
    reason: String,
    fees: String,
    paymentAcknowlegment: Boolean,
    uniqueId: String,
    doctorsBank: String,
    doctorsAccNo: String,
    prescription: Array

});

module.exports = appointmentSchema;