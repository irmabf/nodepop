'use strict';

//Require mongoose module
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connect to the db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MiNodePop',{
    useMongoClient: true
});

module.exports = { mongoose };