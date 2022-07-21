const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0.00
    },
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }]
}, {timestamps: true});

module.exports = mongoose.model('Customer', CustomerSchema);