import {NEW} from "../public/helpers/EShiftStatus";

const mongoose = require('mongoose');
// Log Schema - probably for shifts
const LogSchema = mongoose.Schema({
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        shift: {type: mongoose.Schema.Types.ObjectId, ref: 'Shift'},
        status: {type: String, default: NEW},
        updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        // oldValue: 
    },
    {
        timestamps: true // for adding createdAt & updatedAt fields
    }
);

const Log = mongoose.model('Log', LogSchema);

function createLogInstance(log) {
    let newLog = new Log();
    Object.assign(newLog, log);
    return newLog;
}

const getAllLogs = () => {
    return Log.find().exec();
};

const getByLogId = (id) => {
    return Log.findById(id).exec();
};

const getByCompanyId = (companyId) => {
    return Log.find({company: companyId}).exec();
};

const createLog = (log) => {
    let newLog = createLogInstance(log);

    return newLog.save();
};

const updateLog = (log) => {
    let newLog = createLogInstance(log);
    newLog._id = log._id;

    newLog = newLog.toObject();
    return Log.findOneAndUpdate({'_id': newLog._id}, newLog, {upsert: true, new: true}).exec();
};

const deleteLog = (id) => {
    return Log.remove({_id: id}).exec();
};

const deleteAllLogs = (conditions) => {
    if (!conditions)
        conditions = {};
    return Log.remove(conditions).exec();
};

const logsCount = () => Log.countDocuments().exec();

const getPredefinedLogs = () => Log.find({type: {$ne: ELogType.REGULAR}}).exec();

module.exports = {
    createLog
    , getByLogId
    , getByCompanyId
    , getAllLogs
    , updateLog
    , deleteLog
    , deleteAllLogs
    , logsCount
    , getPredefinedLogs
};
