'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const ShiftModel = require('../models/ShiftModel');
const jwtService = require("./jwtService");
const HolidayAnalyzer = require('../managers/HolidayAnalyzer');
const {getFirstLocation} = require("../managers/utils");
const {calcClockInInsideWorkplace} = require("../managers/ShiftAnalyzer");
const reject = require("./apiManager").reject;
const routeWrapper = require("./apiManager").routeWrapper;
const { body, param } = require('express-validator/check');

//GET /shifts shift
router.get('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        if (req.query.pending)
            return getPendingShifts(req, res);

        return getShiftsBetweenDates(req, res);
    })
);

//POST /shifts shift
router.post('/',
    [
        body('clockInTime').exists().withMessage("clockInTime is mandatory"),
        body('user').exists().withMessage("user is mandatory"),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let newShift = req.body;
        fillMissingShiftData(res, newShift);

        return ShiftModel.createShift(newShift);
    })
);

//PUT /shifts shift
router.put('/',
    [
        body('clockInTime').exists().withMessage("clockInTime is mandatory"),
        body('user').exists().withMessage("user is mandatory"),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {

        let newShift = req.body;
        fillMissingShiftData(res, newShift);

        return ShiftModel.updateShift(newShift);
    })
);

//DELETE /shifts/{id} shiftUid
router.delete('/:id',
    [
        param('id').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return ShiftModel.deleteShift(id)
            .then(() => id);
    })
);

function fillHolidayData(newShift) {
    newShift.dayType = HolidayAnalyzer.analyzeDayType(newShift.clockInTime);
}

let fillMissingShiftData = function (res, newShift) {
    const companyFromToken = jwtService.getCompanyFromLocals(res);
    newShift.company = companyFromToken._id;

    fillHolidayData(newShift);
};

function getPendingShifts(req, res) {
    const company = jwtService.getCompanyFromLocals(res);

    return ShiftModel.getPendingShifts(company);
}

const getShiftsBetweenDates = async (req, res) => {
    const startDate = req.query.startDate || moment().startOf('month');
    const userId = req.query.userId;

    if (userId && !jwtService.isUserIdValid(userId, req))
        return reject("[ShiftsController.Get] userId is not valid - does not fit token", 400);

    let endDate = req.query.endDate || moment(startDate).endOf('month');
    endDate = moment(endDate).endOf('day');

    if (!moment(startDate).isValid() || !moment(endDate).isValid())
        return reject("[ShiftsController.Get] moment isValid() failed - startDate || endDate are not valid", 400);

    const company = jwtService.getCompanyFromLocals(res);

    let shifts = await ShiftModel.getShiftsBetween(company, startDate, endDate, userId);
    
    // Enrich data on shift
    shifts.map(shift => {
        let location = getFirstLocation(shift);
        shift.isClockInInsideWorkplace = calcClockInInsideWorkplace(location, company.workplaces)
    });
    return shifts;
};

module.exports = router;
