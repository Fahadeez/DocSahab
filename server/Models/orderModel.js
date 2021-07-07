const mongoose = require('mongoose');
const productSchema = require('./productsModel');
const { Schema } = mongoose;

const orderSchema = Schema({

    id: String,
    uId: String,
    userName: String,
    date: String,
    subTotal: String,
    userId: String,
    products: [productSchema],
    paymentMethod: String,
    status: Boolean,
    alert: String,
    reason: String

});

module.exports = orderSchema;
mongoose.model('orders', orderSchema);
