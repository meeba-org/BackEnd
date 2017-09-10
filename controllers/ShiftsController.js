'use strict';
const ShiftModel = require('../models/shiftModel');
const express = require('express');
const router = express.Router();
const moment = require('moment');

//GET /shifts/{uid} shift
router.get('/', (req, res) => {
    req.checkQuery('startDate', 'Start date is required').isRequired().notEmpty();
    const startDate = req.query.startDate;
    const endDate = req.query.endDate || moment(startDate).add(1, 'days');

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            ShiftModel.getShiftsBetween(startDate, endDate)
                .then((shifts) => {
                    if (shifts)
                        return res.status(200).json(shifts);
                })
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

function overrideClockInOfExistingShift(shift, res) {
    return ShiftModel.update(shift)
        .then((shift) => res.status(200).json({shift: shift}))
        .catch((err) => res.status(500).json({message: err}));
}

function createNewShift(shift, res) {
    return ShiftModel.create(shift)
        .then((shift) => res.status(200).json({shift: shift}))
        .catch((err) => res.status(500).json({message: err}));
}

function updateShiftEndDate(shift, res) {
    shift.clockOutTime = new Date;

    return ShiftModel.update(shift)
        .then((shift) => res.status(200).json({shift: shift}))
        .catch((err) => res.status(500).json({message: err}));
}

//POST /shifts shift
router.post('/', (req, res) => {
    req.checkBody('uid', 'uid is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            let newShift = req.body;
            ShiftModel.getLastOpenShiftByUid(newShift.uid)
                .then((shift) => {
                    if (shift) {
                        // Shift exist --> update startTime as current
                        return overrideClockInOfExistingShift(newShift, res);
                    }
                    else {
                        return createNewShift(newShift, res);
                    }
                });
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//PUT /shifts shift
router.put('/', (req, res) => {
    req.checkBody('uid', 'uid is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            let newShift = req.body;
            return ShiftModel.getLastOpenShiftByUid(newShift.uid)
                .then((shift) => {
                    if (shift) {
                        // Shift exist --> update startTime as current
                        return updateShiftEndDate(shift, res);
                    }
                    throw new Error("[shifts] - PUT - could not find an open shift to clockout");
                })
                .catch((err) => res.status(400).json({message: err.message}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//DELETE /shifts/{id} shiftUid
router.delete('/:id', (req, res) => {
    req.checkParams('id', 'id is required').notEmpty().isInt();

    return req.getValidationResult()
        .then(function (result) {
            result.throw();

            const uid = req.params.id;

            return ShiftModel.delShift(uid)
                .then(() => {
                    return res.status(204).send();
                })
                .catch((err) => {
                    return res.status(500).json({message: err});
                });
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

module.exports = router;
