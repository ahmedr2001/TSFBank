const router = require('express').Router();
const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({createdAt: -1});
    
        res.render('pages/transactions', {
            title: 'Transactions - TSFBank',
            files: 'transactions',
            transactions
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.get('/transfer', async (req, res) => {
    try {
        const receiver = {};
        const { to } = req.query;
        const customers = await Customer.find({}).sort({name:1});

        if (to) {
            receiver.accountNumber = to;
            const {email} = Customer.findOne({accountNumber: to}).select('-_id email');
            receiver.email = email;
        }

        res.render('pages/transfer', {
            title: 'Transfer - TSFBank',
            files: 'transactions',
            receiver,
            customers
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        const sender = await Customer.findOne({accountNumber: transaction.from});
        const receiver = await Customer.findOne({accountNumber: transaction.to});

        if(!transaction || !sender || !receiver){
            res.redirect('back');
        }

        res.render('pages/transactionDetails', {
            title: 'Transactions - TSFBank',
            files: 'transactions',
            transaction,
            sender,
            receiver
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.post('/transfer', async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const sender = await Customer.findOne({accountNumber: from}).populate('transactions');

        if (sender.balance >= amount) {
            const receiver = await Customer.findOne({ accountNumber: to }).populate('transactions');
            const transaction = await new Transaction(req.body);

            sender.balance = sender.balance - parseInt(amount);
            receiver.balance = receiver.balance + parseInt(amount);

            sender.transactions.push(transaction);
            receiver.transactions.push(transaction);

            await sender.save();
            await receiver.save();
            await transaction.save();

            return res.redirect(`./${transaction._id}`);
        }

        res.redirect('back');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        const sender = await Customer.findOne({ accountNumber: transaction.from });
        const receiver = await Customer.findOne({ accountNumber: transaction.to });
        const amount = transaction.amount;

        if (receiver.balance >= amount) {
            receiver.balance -= parseInt(amount);
            sender.balance += parseInt(amount);

            // await receiver.transactions.deleteOne({ transaction });
            // await sender.transactions.deleteOne({ transaction });

            await receiver.save();
            await sender.save();

            await transaction.delete();

            res.status(200);
        }

        res.redirect('/');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;
