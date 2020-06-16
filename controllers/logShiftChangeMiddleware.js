const {getCompanyFromLocals} = require("./jwtService");
const {createShiftLog, isNew} = require('../models/ShiftLogModel');
const {getByShiftId} = require('../models/DraftShiftModel');
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
    let oldShift = shift;
    let newShift;

    if (!isNew(shift)) {
        newShift = shift.draftShift;
    }

    const shiftLog = createShiftLogObj(newShift, oldShift);

    createShiftLog(shiftLog);

    return next();
};

module.exports = {
    logShiftChangeMiddleware
};
