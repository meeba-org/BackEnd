const moment = require('moment');
const mongoose = require('mongoose');
const DraftShiftModel = require("./DraftShiftModel");
const reject = require("../controllers/apiManager").reject;
const EShiftStatus = require('../public/helpers/EShiftStatus');

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
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    commuteCost: {
        publicTransportation: {type: Number, default: 0, required: true},
    },
    extraPay: {type: Number, default: 0, required: true},
    location: {
        latitude: {type: Number},
        longitude: {type: Number}
    },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    breakLength: {type: Number, default: 0},
    draftShift: { type: mongoose.Schema.Types.ObjectId, ref: 'DraftShift' },
    status: {type: Number, default: 0},
});

const Shift = mongoose.model('Shift', ShiftSchema);

function createShiftInstance(shift) {
    let newShift = new Shift();
    Object.assign(newShift, shift);
    return newShift;
}

export const getByShiftId = (id) => {
    return Shift.findById(id);
};

export const createShift = (shift) => {
    return DraftShiftModel.createDraftShift(shift.draftShift)
        .then(draftShift => {
            if (draftShift)
                shift.draftShift = draftShift;

            let newShift = createShiftInstance(shift);

            return newShift.save()
                .then(shift => Shift.populate(shift, {path: 'user'}));
        });
};

export const updateShift = (shift) => {
    if (!shift._id)
        return reject("[ShiftModel.updateShift] - no valid id");

    return DraftShiftModel.createOrUpdateDraftShift(shift.draftShift)
        .then(draftShift => {
            if (draftShift)
                shift.draftShift = draftShift;

            let newShift = createShiftInstance(shift);
            newShift._id = shift._id;

            newShift = newShift.toObject();
            return Shift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true, setDefaultsOnInsert: true}).populate('user task draftShift').exec();
        })
};

export const deleteShift = (id) => {
    return Shift.remove({_id: id}).exec();
};

export const getPendingShifts = (company) => {
    let condition = {
        $or: [{status: EShiftStatus.PENDING_UPDATE}, {status: EShiftStatus.PENDING_CREATE}],
        company: company._id
    };

    return Shift.find(condition).populate('user task draftShift').lean()
        .then((shifts) => shifts.sort((s1, s2) => s1.clockInTime - s2.clockInTime));
};

export const getShiftsBetween = (company, startDate, endDate, userId) => {
    let condition = {
        clockInTime: {
            $gte: startDate,
            $lt: endDate
        },
        company: company._id
    };

    if (userId)
        condition.user = userId;

    return Shift.find(condition).populate('user task draftShift').lean()
        .then((shifts) => shifts.sort((s1, s2) => s1.clockInTime - s2.clockInTime));
};

export const deleteAllShifts = (conditions) => {
    if (!conditions)
        conditions = {};
    return Shift.remove(conditions).exec();
};

export const createOrUpdateShift = (shift) => {
    if (!shift)
        throw new Error('Shift is not valid');

    if (shift._id)
        return updateShift(shift);
    else
        return createShift(shift);
};

export const shiftsCount = () => Shift.countDocuments().exec();

module.exports = {
    createOrUpdateShift
    , deleteAllShifts
    , getShiftsBetween
    , getPendingShifts
    , getByShiftId
    , createShift
    , updateShift
    , deleteShift
    , shiftsCount
};
