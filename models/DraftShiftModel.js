const mongoose = require('mongoose');
const reject = require("../controllers/apiManager").reject;

// Draft Shift Schema
const DraftShiftSchema = mongoose.Schema({
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
    commuteCost: {
        publicTransportation: {type: Number, default: 0, required: true},
    },
    extraPay: {type: Number, default: 0, required: true},
});

const DraftShift = mongoose.model('DraftShift', DraftShiftSchema, 'draftShifts');

function createShiftInstance(shift) {
    let newShift = new DraftShift();
    Object.assign(newShift, shift);
    return newShift;
}

const getByDraftShiftId = (id) => {
    return DraftShift.findById(id);
};

const createDraftShift = (shift) => {
    if (!shift)
        return null;

    let newShift = createShiftInstance(shift);

    return newShift.save();
};

const updateDraftShift = (draftShift) => {
    if (!draftShift._id)
        return reject("[DraftShiftModel.updateDraftShift] - no valid id");

    let newShift = createShiftInstance(draftShift);
    newShift._id = draftShift._id;

    newShift = newShift.toObject();
    return DraftShift.findOneAndUpdate({'_id': newShift._id}, newShift, {upsert: true, new: true}).exec();
};

const deleteDraftShift = (id) => {
    return DraftShift.remove({_id: id}).exec();
};

const deleteAllDraftShifts = (conditions) => {
    if (!conditions)
        conditions = {};
    return DraftShift.remove(conditions).exec();
};

const createOrUpdateDraftShift = (shift) => {
    if (!shift)
        throw new Error('Shift is not valid');

    if (shift._id)
        return updateDraftShift(shift);
    else
        return createDraftShift(shift);
};

const draftShiftsCount = () => DraftShift.countDocuments().exec();

module.exports = {
    createOrUpdateDraftShift
    , deleteAllDraftShifts
    , getByDraftShiftId
    , createDraftShift
    , updateDraftShift
    , deleteDraftShift
    , draftShiftsCount
};
