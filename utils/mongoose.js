const mongoose = require('mongoose');
const colors = require('colors');

module.exports = {
    init: () => {
        mongoose.connect(process.env.MONGODB).catch(err => console.log(err.reason));

        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection successfully opened!'.bold.white);
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n ${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected'.bold.red);
        });
    }
};