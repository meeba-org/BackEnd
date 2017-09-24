'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ShiftModel = require('../models/ShiftModel');

//GET /shifts shift
router.get('/', (req, res) => {
    req.checkQuery('startDate', 'Start date is required').notEmpty();

    const startDate = req.query.startDate;
    const endDate = req.query.endDate || moment(startDate).add(30, 'days');

    if (!moment(startDate).isValid() || !moment(endDate).isValid())
        return res.status(400).json({message: "moment isValid() failed - startDate || endDate are not valid"});

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

function updateShiftEndDate(shift, res) {
    shift.clockOutTime = new Date;

    return ShiftModel.updateShift(shift)
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
            ShiftModel.createOrUpdateShift(newShift)
                .then((shift) => res.status(200).json({shift: shift}))
                .catch((err) => res.status(500).json({message: err}));
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

            ShiftModel.createOrUpdateShift(newShift)
                .then((shift) => res.status(200).json({shift: shift}))
                .catch((err) => res.status(500).json({message: err}));
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

            return ShiftModel.deleteShift(uid)
                .then(res.status(204).send())
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

module.exports = router;
