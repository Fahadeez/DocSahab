const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = Schema({
    
    id: String,
    name: String,
    price: String,

});

module.exports = productSchema;