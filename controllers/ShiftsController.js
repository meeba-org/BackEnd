'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ShiftModel = require('../models/ShiftModel');
const jwtService = require("./jwtService");

//GET /shifts shift
router.get('/', (req, res) => {
    const startDate = req.query.startDate || moment().startOf('month');
    const userId = req.query.userId;

    if (userId && !jwtService.isUserIdValid(userId, req))
        return res.status(400).json({message: "[ShiftsController.Get] userId is not valid - does not fit token"});

    let endDate = req.query.endDate || moment(startDate).add(30, 'days');
    endDate = moment(endDate).endOf('day');

    if (!moment(startDate).isValid() || !moment(endDate).isValid())
        return res.status(400).json({message: "moment isValid() failed - startDate || endDate are not valid"});

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            const company = jwtService.getCompanyFromLocals(res);

            ShiftModel.getShiftsBetween(company, startDate, endDate, userId)
                .then((shifts) => {

                    if (shifts)
                        return res.status(200).json(shifts);
                })
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//POST /shifts shift
router.post('/', (req, res) => {
    req.checkBody('user', 'user id is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            let newShift = req.body;
            const companyFromToken = jwtService.getCompanyFromLocals(res);
            newShift.company = companyFromToken._id;

            ShiftModel.createOrUpdateShift(newShift)
                .then((shift) => res.status(200).json(shift))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//PUT /shifts shift
router.put('/', (req, res) => {
    req.getValidationResult()
        .then(function (result) {
            result.throw();

            let newShift = req.body;
            const companyFromToken = jwtService.getCompanyFromLocals(res);
            newShift.company = companyFromToken._id;

            ShiftModel.createOrUpdateShift(newShift)
                .then((shift) => res.status(200).json(shift))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//DELETE /shifts/{id} shiftUid
router.delete('/:id', (req, res) => {
    req.checkParams('id', 'id is required').notEmpty();

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
