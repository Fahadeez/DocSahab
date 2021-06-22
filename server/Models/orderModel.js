const mongoose = require('mongoose');
const productSchema = require('./productsModel');
const { Schema } = mongoose;

const orderSchema = Schema({

    id: String,
    date: String,
    subTotal: String,
    userId: String,
    products: [productSchema],
    paymentMethod: String

});

module.exports = orderSchema;
mongoose.model('orders', orderSchema);
