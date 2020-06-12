const {getCompanyFromLocals} = require("./jwtService");
const {createShiftLog, isNew} = require('../models/ShiftLogModel');
const {getByShiftId} = require('../models/ShiftModel');
const {getByCompanyId} = require('../models/CompanyModel');
const {isInnovativeAuthorityEnable} = require('../managers/FeaturesManager');

const isApiRelevantForLogging = req => 
    ((req.method.toLowerCase() === 'put' || req.method.toLowerCase() === 'post') && req.url === '/shifts');

const shouldLog = async (req, res) => {
    if (!isApiRelevantForLogging(req))
        return false;
    
    const companyFromLocals = getCompanyFromLocals(res);
    const company = await getByCompanyId(companyFromLocals._id);

    return isInnovativeAuthorityEnable(company);
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
    if (!await shouldLog(req, res))
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
