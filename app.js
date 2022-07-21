const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//require('dotenv').config();

const DB_URI = 'mongodb+srv://ahmedr2001:eng3469635@cluster0.4ltdu.mongodb.net/test';

async function db(URI) {
    await mongoose.connect(URI);
    console.log("Connected to DB");
};

db(DB_URI).catch(err => console.log(err));

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(require('./routes'));
app.use('/customers', require("./routes/customers"));
app.use('/transactions', require("./routes/transactions"));

app.listen(8080, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port 8080`);
});
