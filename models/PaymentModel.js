const mongoose = require('mongoose');

// Group Schema
const PaymentSchema = mongoose.Schema({
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        publicSaleToken: {type: String},
        privateSaleToken: {type: String},
        url: {type: String},
        status: {type: Number}
    },
    {
        timestamps: true // for adding createdAt & updatedAt fields
    }
);

const Payment = mongoose.model('Payment', PaymentSchema);

function createPaymentInstance(payment) {
    let newPayment = new Payment();
    Object.assign(newPayment, payment);
    return newPayment;
}

const getAllPayments = () => {
    return Payment.find().exec();
};

const getByPaymentId = (id) => {
    return Payment.findById(id).exec();
};

const getByCompanyIdAndToken = (companyId, publicSaleToken) => {
    return Payment.findOne({company: companyId, publicSaleToken}).exec();
};

const createPayment = (payment) => {
    let newPayment = createPaymentInstance(payment);

    return newPayment.save();
};

const updatePayment = (payment) => {
    let newPayment = createPaymentInstance(payment);
    newPayment._id = payment._id;

    newPayment = newPayment.toObject();
    delete newPayment.updatedAt; // if it exist it wont get updated in db
    return Payment.findOneAndUpdate({'_id': newPayment._id}, newPayment, {upsert: true, new: true}).exec();
};

const deletePayment = (id) => {
    return Payment.remove({_id: id}).exec();
};

const deleteAllPayments = (conditions) => {
    if (!conditions)
        conditions = {};
    return Payment.remove(conditions).exec();
};

const paymentsCount = () => Payment.countDocuments().exec();

module.exports = {
    createPayment
    , getByPaymentId
    , getByCompanyIdAndToken
    , getAllPayments
    , updatePayment
    , deletePayment
    , deleteAllPayments
    , paymentsCount
};
