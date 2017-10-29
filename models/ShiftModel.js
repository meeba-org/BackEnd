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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
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

    // Do this way since I didnt find a way to save & populate the user in the same syntax
    return Shift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true}).populate('user').exec();
};

const updateShift = (shift) => {
    let newShift = createShiftInstance(shift);
    newShift._id = shift._id;

    newShift = newShift.toObject();
    return Shift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true}).populate('user').exec();
};

const deleteShift = (id) => {
    return Shift.remove({_id: id}).exec();
};

const getLastOpenShiftById = (id) => {
    return Shift.findOne({id: id}).sort('clockInTime').where('clockOutTime').equals(null).exec();
};

const getShiftsBetween = (company, startDate, endDate) => {
    return Shift.find({
        clockInTime: {
            $gte: startDate,
            $lt: endDate
        },
        company: company._id
    }).populate('user')
        .then((shifts) => shifts.sort((s1, s2) => s1.clockInTime - s2.clockInTime));
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
    if (!shift)
        throw new Error('Shift is not valid');

    if (shift._id)
        return updateShift(shift);
    else
        return createShift(shift);
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
