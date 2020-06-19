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
    
    return (shift.status === EShiftStatus.PENDING_CREATE || shift.status === EShiftStatus.PENDING_UPDATE || shift.status === EShiftStatus.APPROVED);
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

        if (shift.status === EShiftStatus.PENDING_UPDATE || shift.status === EShiftStatus.PENDING_CREATE) {
            newShift = {...shift.draftShift};
            oldShift = {...shift, draftShift: null};
        }
        else if (shift.status === EShiftStatus.APPROVED) {
            oldShift = {... shift};
        }

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
