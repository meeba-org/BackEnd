const {createShiftLog, isNew} = require('../models/ShiftLogModel');
const {getByShiftId} = require('../models/ShiftModel');

const shouldLog = (req) => {
    return (req.method.toLowerCase() === 'put' && req.url === '/shifts');
};

const fetchOldValue = async shiftId => {
    const shift = await getByShiftId(shiftId);
    return shift;
};

const createShiftLogObj = (newValue, oldValue) => ({
    company: newValue.company,
    status: newValue.status,
    newValue,
    oldValue
});

const logShiftChangeMiddleware = async (req, res, next) => {
    if (!shouldLog(req))
        return next();

    let shift = req.body;
    let oldShiftLogValue;

    if (!isNew(shift)) {
        oldShiftLogValue = await fetchOldValue(shift._id);
    }

    const shiftLog = createShiftLogObj(shift, oldShiftLogValue);

    createShiftLog(shiftLog);

    return next();
};

module.exports = {
    logShiftChangeMiddleware
};
