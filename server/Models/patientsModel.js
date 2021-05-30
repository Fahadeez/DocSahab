const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = Schema({

    patientID: {type: String, unique: true, required: true},
    patientName: String

});


module.exports = patientSchema;