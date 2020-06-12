import {NEW} from "../public/helpers/EShiftStatus";

const mongoose = require('mongoose');
// ShiftLog Schema - probably for shifts
const ShiftLogSchema = mongoose.Schema({
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        status: {type: String, default: NEW},
//        updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // TODO add who did the change
        oldValue: {},
        newValue: {}
    },
    {
        timestamps: true // for adding createdAt & updatedAt fields
    }
);

const ShiftLog = mongoose.model('ShiftLog', ShiftLogSchema);

function createShiftLogInstance(shiftLog) {
    let newShiftLog = new ShiftLog();
    Object.assign(newShiftLog, shiftLog);
    return newShiftLog;
}

const getAllShiftLogs = () => {
    return ShiftLog.find().exec();
};

const getByShiftLogId = (id) => {
    return ShiftLog.findById(id).exec();
};

const getByCompanyId = (companyId) => {
    return ShiftLog.find({company: companyId}).exec();
};

const createShiftLog = (shiftLog) => {
    let newShiftLog = createShiftLogInstance(shiftLog);

    return newShiftLog.save();
};

const updateShiftLog = (shiftLog) => {
    let newShiftLog = createShiftLogInstance(shiftLog);
    newShiftLog._id = shiftLog._id;

    newShiftLog = newShiftLog.toObject();
    return ShiftLog.findOneAndUpdate({'_id': newShiftLog._id}, newShiftLog, {upsert: true, new: true}).exec();
};

const deleteShiftLog = (id) => {
    return ShiftLog.remove({_id: id}).exec();
};

const deleteAllShiftLogs = (conditions) => {
    if (!conditions)
        conditions = {};
    return ShiftLog.remove(conditions).exec();
};

const shiftLogsCount = () => ShiftLog.countDocuments().exec();

const isNew = shift => !shift._id;

module.exports = {
    createShiftLog
    , getByShiftLogId
    , getByCompanyId
    , getAllShiftLogs
    , updateShiftLog
    , deleteShiftLog
    , deleteAllShiftLogs
    , shiftLogsCount
    , isNew
};
