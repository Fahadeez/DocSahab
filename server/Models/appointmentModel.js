const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = Schema({
    
    id: String,
    name: String,
    specialization: String,
    date: String,
    time: String,
    reason: String,
    fees: String,
    paymentAcknowlegment: Boolean,
    uniqueId: String,

});

module.exports = appointmentSchema;