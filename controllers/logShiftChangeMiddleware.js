const {PENDING_CREATE, PENDING_UPDATE} = require("../public/helpers/EShiftStatus");
const {getCompanyFromLocals} = require("./jwtService");
const {createShiftLog} = require('../models/ShiftLogModel');
const {getByCompanyId} = require('../models/CompanyModel');
const {getByShiftId} = require('../models/ShiftModel');
const {isInnovativeAuthorityEnable} = require('../managers/FeaturesManager');
const {getUserFromLocals} = require("./jwtService");

const isApiRelevantForLogging = req => 
    ((req.method.toLowerCase() === 'put' || req.method.toLowerCase() === 'post') && req.url === '/shifts');

const shouldLog = async (req, res) => {
    if (!isApiRelevantForLogging(req))
        return false;
    
    const companyFromLocals = getCompanyFromLocals(res);
    const company = await getByCompanyId(companyFromLocals._id);

    return isInnovativeAuthorityEnable(company);
};

const createShiftLogObj = (newValue, oldValue, status, company, updatedBy) => ({
    company,
    status,
    newValue,
    oldValue,
    updatedBy
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
        let updatedBy = getUserFromLocals(res)._id;
        
        if (req.method.toLowerCase() === 'put') {
            if (shift.status === PENDING_UPDATE) {
                newShift = {...shift, ...shift.draftShift};
                oldShift = {...shift, draftShift: null};
            }
            else {
                // Updating a shift by the manager
                oldShift = await getByShiftId(shift._id);
                newShift = {...shift};
            }
            status = oldShift.status;
            
        }
        else if (req.method.toLowerCase() === 'post') {
            // Creating a shift by the manager
            newShift = {...shift, draftShift: null};
            status = newShift.status;
        }

        const shiftLog = createShiftLogObj(newShift, oldShift, status, company, updatedBy);

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
