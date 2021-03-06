const mongoose = require('mongoose');
const DraftShiftModel = require("./DraftShiftModel");
const reject = require("../controllers/apiManager").reject;
const EShiftStatus = require('../public/helpers/EShiftStatus');
const moment = require('moment');

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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    commuteCost: {
        publicTransportation: {type: Number, default: 0, required: true},
    },
    extraPay: {type: Number, default: 0, required: true},
    location: { // Deprecated for locations
        latitude: {type: Number},
        longitude: {type: Number},
    },
    locations: [{
        latitude: {type: Number},
        longitude: {type: Number},
        date: {type: Date}
    }],
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    breakLength: {type: Number, default: 0},
    draftShift: { type: mongoose.Schema.Types.ObjectId, ref: 'DraftShift' },
    status: {type: Number, default: EShiftStatus.NEW},
    isClockInTimeRetro: { type: Boolean, default: true}, // IA - Was the shift punched as retro or not
    isClockOutTimeRetro: { type: Boolean, default: true}, // IA - Was the shift punched as retro or not
    wfh: { type: Boolean, default: false}, // IA - Working from home
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
    return DraftShiftModel.createDraftShift(shift.draftShift)
        .then(draftShift => {
            if (draftShift)
                shift.draftShift = draftShift;

            let newShift = createShiftInstance(shift);

            return newShift.save()
                .then(shift => Shift.populate(shift, {path: 'user'}));
        });
};

const updateShift = async (shift) => {
    if (!shift._id)
        return reject("[ShiftModel.updateShift] - no valid id");

    const draftShift = await DraftShiftModel.createOrUpdateDraftShift(shift.draftShift);
    if (draftShift)
        shift.draftShift = draftShift;

    let newShift = createShiftInstance(shift);
    newShift._id = shift._id;

    newShift = newShift.toObject();
    return Shift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true, setDefaultsOnInsert: true}).populate('user task draftShift').exec();
};

const deleteShift = (id) => {
    return Shift.deleteOne({_id: id}).exec();
};

const getPendingShifts = (company) => {
    let condition = {
        $or: [{status: EShiftStatus.PENDING_UPDATE}, {status: EShiftStatus.PENDING_CREATE}],
        company: company._id
    };

    return Shift.find(condition).populate('user task draftShift').lean()
        .then((shifts) => shifts.sort((s1, s2) => s1.clockInTime - s2.clockInTime));
};

const getShiftsBetween = (company, startDate, endDate, userId) => {
    startDate = startDate || moment().add(-1, 'days'); // Default is yesterday
    endDate = endDate || moment(); // Default is now
    
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

const deleteAllShifts = (conditions) => {
    if (!conditions)
        conditions = {};
    return Shift.deleteMany(conditions).exec();
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
    , getPendingShifts
    , getByShiftId
    , createShift
    , updateShift
    , deleteShift
    , shiftsCount
    , ShiftSchema
};
