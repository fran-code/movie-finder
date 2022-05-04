const mongoose = require('mongoose')
const env = require('../env')

mongoose.connect(env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// When successfully connected
db.on('connected', () => {
    console.log('Mongoose connected');
});

// If the connection throws an error
db.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
});

// When the connection is disconnected
db.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose
