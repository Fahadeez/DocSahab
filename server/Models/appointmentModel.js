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

});

module.exports = appointmentSchema;