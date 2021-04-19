const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = Schema({
    
    id: String,
    date: String,
    time: String,
    reason: String,
    fees: String,
});

module.exports = appointmentSchema;