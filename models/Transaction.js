const mongoose = require('mongoose');

const TransactionModel = new mongoose.Schema({
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true });

module.exports = mongoose.model('Transaction', TransactionModel);