const {getCompanyFromLocals} = require("./jwtService");
const {createShiftLog} = require('../models/ShiftLogModel');
const {getByCompanyId} = require('../models/CompanyModel');
const {isInnovativeAuthorityEnable} = require('../managers/FeaturesManager');
const EShiftStatus = require("../public/helpers/EShiftStatus");

const isApiRelevantForLogging = req => 
    ((req.method.toLowerCase() === 'put' || req.method.toLowerCase() === 'post') && req.url === '/shifts');

const shouldLog = async (req, res) => {
    if (!isApiRelevantForLogging(req))
        return false;
    
    const companyFromLocals = getCompanyFromLocals(res);
    const company = await getByCompanyId(companyFromLocals._id);

    if (!isInnovativeAuthorityEnable(company))
        return false;
    
    const shift = req.body;
    
    // TODO Add EShiftStatus.APPROVED
    return (shift.status === EShiftStatus.PENDING_CREATE || shift.status === EShiftStatus.PENDING_UPDATE);
};

const createShiftLogObj = (newValue, oldValue) => ({
    company: oldValue.company,
    status: oldValue.status,
    newValue,
    oldValue
});

const logShiftChangeMiddleware = async (req, res, next) => {
    try {
        if (!await shouldLog(req, res))
            return next();

        let shift = req.body;
        let oldShift;
        let newShift;

        newShift = { ...shift.draftShift};
        oldShift = { ...shift, draftShift: null};

        const shiftLog = createShiftLogObj(newShift, oldShift);

        createShiftLog(shiftLog);
        return next();
    }
    catch (e) {
        console.error(e);
        return next();
    }
};

module.exports = {
    logShiftChangeMiddleware
};
