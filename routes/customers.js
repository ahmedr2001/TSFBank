const router = require('express').Router();
const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({}).select('_id name email accountNumber age balance location').sort({name:1});
        const totalBalance = customers.reduce((acc, customer) => 
            acc + customer.balance, 0);

        res.render('pages/customers', {
            title: 'Customers - TSFBank',
            files: 'customers',
            customers,
            totalBalance
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const customer = await new Customer(req.body);
        await customer.save();
    
        res.redirect('/customers');
    } catch (err) {
        res.redirect('/customers');
        console.log(err);
    }
});

router.get('/createCustomer', async (req, res) => {
    try {
        res.render('pages/createCustomer', {
            title: 'Create Customer - TSFBank',
            files: 'transactions'
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id).populate('transactions', '_id from to amount createdAt', null, { sort:{ createdAt: -1 } });

        res.render('pages/customerDetails', {
            title: `${customer.name} - TSFBank`,
            files: 'customers',
            transactions: customer.transactions,
            customer
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        
        if (!customer) {
            return res.redirect('back');
        }
        
        await Transaction.findByIdAndRemove(customer.transactions);
        await customer.delete();

        res.sendStatus(200);
        res.redirect('/');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;