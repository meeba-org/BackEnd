const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connect = async (dbUrl) => {
    await mongoose.connect(dbUrl, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true,});
    console.log("Connected to DB successfully");
};

module.exports = {
    connect
};
