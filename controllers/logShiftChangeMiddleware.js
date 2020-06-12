const {createShiftLog, isNew} = require('../models/ShiftLogModel');
const {getByShiftId} = require('../models/ShiftModel');

const shouldLog = () => false;

const fetchOldValue = async shiftId => {
    return await getByShiftId(shiftId);
};

const createShiftLogObj = (newValue, oldValue) => ({
    company: newValue.company,
    status: newValue.status,
    newValue,
    oldValue
});

const logShiftChangeMiddleware = (req, res, next) => {
    if (!shouldLog()) 
        return next();

    let shift = req.body;
    let oldShiftLogValue;
    
    if (!isNew(shift)) {
        oldShiftLogValue = fetchOldValue(shift._id);
    }

    const shiftLog = createShiftLogObj(shift, oldShiftLogValue);
    
    createShiftLog(shiftLog);
    
    return next();
};

module.exports = {
    logShiftChangeMiddleware
};
