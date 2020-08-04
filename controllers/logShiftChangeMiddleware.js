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

const createShiftLogObj = (newValue, oldValue, status, company) => ({
    company,
    status,
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
        let status;
        let company = getCompanyFromLocals(res)._id;

        if (shift.status === EShiftStatus.PENDING_UPDATE) {
            newShift = {...shift.draftShift};
            oldShift = {...shift, draftShift: null};
            status = oldShift.status;
        }
        else if (shift.status === EShiftStatus.APPROVED || shift.status === EShiftStatus.PENDING_CREATE) {
            newShift = {...shift};
            status = newShift.status;
        }
        else if (req.method.toLowerCase() === 'put') {
            // Updating a shift by the manager
            oldShift = await getByShiftId(shift._id);
            newShift = {...shift};
            status = oldShift.status;
        }
        else if (req.method.toLowerCase() === 'post') {
            // Creating a shift by the manager
            newShift = {...shift};
            status = newShift.status;
        }

        const shiftLog = createShiftLogObj(newShift, oldShift, status, company);

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
