const moment = require('moment');
const mongoose = require('mongoose');

// Shift Schema
const ShiftSchema = mongoose.Schema({
    clockInTime: {
        type: Date,
        default: Date.now
    },
    clockOutTime: {
        type: Date,
        default: null
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    //location
});

const Shift = module.exports = mongoose.model('Shift', ShiftSchema);

function createShiftInstance(shift) {
    let newShift = new Shift();
    Object.assign(newShift, shift);
    return newShift;
}

module.exports.getByShiftId = (id) => {
    return Shift.findById(id);
};

module.exports.createShift = (shift) => {
    let newShift = createShiftInstance(shift);

    return newShift.save();
};

module.exports.updateShift = (shift) => {
    let newShift = createShiftInstance(shift);
    newShift._id = shift._id;

    newShift = newShift.toObject();
    return Shift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true}).exec();
};

module.exports.deleteShift = (id) => {
    return Shift.remove({_id: id}).exec();
};

module.exports.getLastOpenShiftById = (id) => {
    return Shift.findOne({id: id}).sort('clockInTime').where('clockOutTime').equals(null).exec();
};

module.exports.getShiftsBetween = (startDate, endDate) => {
    return Shift.find({clockInTime: {
        $gte: startDate,
        $lt: endDate
    }});
};

module.exports.getShiftsStartedInDay = (date) => {
    const startDate = moment(date).startOf('day');
    const endDate = moment(startDate).add(1, 'days');

    return Shift.find({clockInTime: {
        $gte: startDate,
        $lt: endDate
    }});
};

module.exports.deleteAllShifts = (conditions) => {
    if (!conditions)
        conditions = {};
    return Shift.remove(conditions).exec();
};
