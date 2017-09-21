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

const Shift = mongoose.model('Shift', ShiftSchema);

function createShiftInstance(shift) {
    let newShift = new Shift();
    Object.assign(newShift, shift);
    return newShift;
}

const getByShiftId = (id) => {
    return Shift.findById(id);
};

const createShift = (shift) => {
    let newShift = createShiftInstance(shift);

    return newShift.save();
};

const updateShift = (shift) => {
    let newShift = createShiftInstance(shift);
    newShift._id = shift._id;

    newShift = newShift.toObject();
    return Shift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true}).exec();
};

const deleteShift = (id) => {
    return Shift.remove({_id: id}).exec();
};

const getLastOpenShiftById = (id) => {
    return Shift.findOne({id: id}).sort('clockInTime').where('clockOutTime').equals(null).exec();
};

const getShiftsBetween = (startDate, endDate) => {
    return Shift.find({clockInTime: {
        $gte: startDate,
        $lt: endDate
    }});
};

const getShiftsStartedInDay = (date) => {
    const startDate = moment(date).startOf('day');
    const endDate = moment(startDate).add(1, 'days');

    return Shift.find({clockInTime: {
        $gte: startDate,
        $lt: endDate
    }});
};

const deleteAllShifts = (conditions) => {
    if (!conditions)
        conditions = {};
    return Shift.remove(conditions).exec();
};

const createOrUpdateShift = (shift) => {
    if (!!shift && shift.id)
        return createShift(shift);
    else
        return updateShift(shift);
};

const shiftsCount = () => Shift.count().exec();

module.exports = {
    createOrUpdateShift
    , deleteAllShifts
    , getShiftsBetween
    , getByShiftId
    , createShift
    , updateShift
    , deleteShift
    , getShiftsStartedInDay
    , getLastOpenShiftById
    , shiftsCount
};
