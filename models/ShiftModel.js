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
    dayType: {
        type: Number
    },
    note: { type: String },
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

    return newShift.save()
        .then(shift => Shift.populate(shift, {path: 'user'}));
};

const updateShift = (shift) => {
    if (!shift._id)
        throw new Error("[ShiftModel.updateShift] - no valid id");

    let newShift = createShiftInstance(shift);
    newShift._id = shift._id;

    newShift = newShift.toObject();
    return Shift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true}).populate('user').exec();
};

const deleteShift = (id) => {
    return Shift.remove({_id: id}).exec();
};

const getShiftsBetween = (company, startDate, endDate, userId) => {
    let condition = {
        clockInTime: {
            $gte: startDate,
            $lt: endDate
        },
        company: company._id
    };

    if (userId)
        condition.user = userId;

    return Shift.find(condition).populate('user').lean()
        .then((shifts) => shifts.sort((s1, s2) => s1.clockInTime - s2.clockInTime));
};

const getShiftsInMonth = (year, month, company, userId) => {
    if (!year)
        throw new Error('[ShiftModel.getShiftsInMonth] - year is not valid');
    if (!month)
        throw new Error('[ShiftModel.getShiftsInMonth] - month is not valid');

    // moment consider month in a zero based
    month = month - 1;
    let startDate = moment().year(year).month(month).startOf('month');
    let endDate = moment().year(year).month(month).endOf('month');

    return getShiftsBetween(company, startDate, endDate, userId);
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

const shiftsCount = () => Shift.countDocuments().exec();

module.exports = {
    createOrUpdateShift
    , deleteAllShifts
    , getShiftsBetween
    , getByShiftId
    , createShift
    , updateShift
    , deleteShift
    , getShiftsInMonth
    , shiftsCount
};
