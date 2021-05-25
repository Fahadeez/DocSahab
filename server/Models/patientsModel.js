const mongoose = require('mongoose');

const { Schema } = mongoose;

const patientSchema = Schema({

    patientID: String,
    patientName: String

}, { strict: false });

module.exports = patientSchema;