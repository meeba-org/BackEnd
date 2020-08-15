const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connect = async (dbUri) => {
    await mongoose.connect(dbUri, {
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log("Connected to DB successfully");
};

module.exports = {
    connect
};
