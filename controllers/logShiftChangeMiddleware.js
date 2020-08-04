const {getCompanyFromLocals} = require("./jwtService");
const {createShiftLog} = require('../models/ShiftLogModel');
const {getByCompanyId} = require('../models/CompanyModel');
const {getByShiftId} = require('../models/ShiftModel');
const {isInnovativeAuthorityEnable} = require('../managers/FeaturesManager');
const EShiftStatus = require("../public/helpers/EShiftStatus");

const isApiRelevantForLogging = req => 
    ((req.method.toLowerCase() === 'put' || req.method.toLowerCase() === 'post') && req.url === '/shifts');

const shouldLog = async (req, res) => {
    if (!isApiRelevantForLogging(req))
        return false;
    
    const companyFromLocals = getCompanyFromLocals(res);
    const company = await getByCompanyId(companyFromLocals._id);

    return isInnovativeAuthorityEnable(company);
};

const createShiftLogObj = (newValue, oldValue, company) => ({
    company,
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
        let company = getCompanyFromLocals(res)._id;

        if (shift.status === EShiftStatus.PENDING_UPDATE || shift.status === EShiftStatus.PENDING_CREATE) {
            newShift = {...shift.draftShift};
            oldShift = {...shift, draftShift: null};
        }
        else if (shift.status === EShiftStatus.APPROVED) {
            oldShift = {... shift};
        }
        else if (req.method.toLowerCase() === 'put') {
            // Updating a shift by the manager
            oldShift = await getByShiftId(shift._id);
            newShift = {...shift};
        }
        else if (req.method.toLowerCase() === 'post') {
            // Creating a shift by the manager
            oldShift = {...shift};
        }

        const shiftLog = createShiftLogObj(newShift, oldShift, company);

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
