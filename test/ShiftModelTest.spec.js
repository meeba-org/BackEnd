const utils = require("./testUtils");
const CompanyModel = require("../models/CompanyModel");
const TIMEOUT = require("./testUtils").TIMEOUT;
const moment = require('moment');
const ShiftModel = require("../models/ShiftModel");
const AppManager = require('../managers/AppManager');
const expect = require('chai').expect;

describe('Shifts', function () {
    this.timeout(TIMEOUT);

    describe('ShiftModel', function () {
        it('getShiftsInMonth - should return shifts of a specific month', function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            const year = 2017;
            const month = 5;
            let createdCompany;

            return CompanyModel.createCompany(newCompany)
                .then((company) => {
                    createdCompany = company;

                    let shift1ClockInTime = moment().year(year).month(month).date(3).hour(8);
                    let shift1 = utils.createMockedShiftPlainObject(shift1ClockInTime, company);

                    return ShiftModel.createShift(shift1)
                })
                .then (() => {
                    let shift2ClockInTime = moment().year(year).month(month).date(10).hour(8);
                    let shift2 = utils.createMockedShiftPlainObject(shift2ClockInTime, createdCompany);

                    return ShiftModel.createShift(shift2)
                })
                .then (() => {
                    // This shift is created in a different month!
                    let shift3ClockInTime = moment().year(year).month(month + 1).date(22).hour(8);
                    let shift3 = utils.createMockedShiftPlainObject(shift3ClockInTime, createdCompany);

                    return ShiftModel.createShift(shift3)
                })
                .then(() => {
                    return ShiftModel.getShiftsInMonth(year, month + 1, createdCompany)
                })
                .then((shifts) => {
                    expect(shifts).to.not.be.null;
                    expect(shifts).to.have.length(2);
                })
        });
    });

    describe('ShiftModel', function () {
        it('getShiftsInMonth - should return shifts of a specific month for a specific user', function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();
            const year = 2017;
            const month = 5;
            let createdCompany;
            let createdUser;

            return CompanyModel.createCompany(newCompany)
                .then((company) => {
                    createdCompany = company;

                    newUser.company = createdCompany;
                    return AppManager.addUser(newUser);
                })
                .then((user) => {
                    createdUser = user;

                    let shift1ClockInTime = moment().year(year).month(month).date(3).hour(8);
                    let shift1 = utils.createMockedShiftPlainObject(shift1ClockInTime, createdUser.company, createdUser);

                    return ShiftModel.createShift(shift1);
                })
                .then (() => {
                    let shift2ClockInTime = moment().year(year).month(month).date(10).hour(8);
                    let shift2 = utils.createMockedShiftPlainObject(shift2ClockInTime, createdCompany);

                    return ShiftModel.createShift(shift2)
                })
                .then (() => {
                    let shift3ClockInTime = moment().year(year).month(month).date(22).hour(8);
                    let shift3 = utils.createMockedShiftPlainObject(shift3ClockInTime, createdUser.company, createdUser);

                    return ShiftModel.createShift(shift3)
                })
                .then(() => {
                    return ShiftModel.getShiftsInMonth(year, month + 1, createdUser.company, createdUser._id);
                })
                .then((shifts) => {
                    expect(shifts).to.not.be.null;
                    expect(shifts).to.have.length(2);
                });
        });
    });

    describe('ShiftModel', function () {
        it('create shift', function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    let mockedShift = utils.createMockedShiftPlainObject(moment('2010-10-20'), createdCompany);
                    return ShiftModel.createShift(mockedShift)
                })
                .then((createdShift) => {
                    expect(createdShift).to.not.be.null;
                    expect(moment(createdShift.clockInTime).isSame('2010-10-20')).to.be.true;
                })
        });

        it('update shift', function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    let mockedShift = utils.createMockedShiftPlainObject(moment(), createdCompany);
                    return ShiftModel.createShift(mockedShift)
                })
                .then((createdShift) => {
                    expect(createdShift).to.not.be.null;
                    createdShift.clockInTime = moment('2010-10-20');

                    return ShiftModel.updateShift(createdShift);
                })
                .then((updatedShift) => {
                    expect(updatedShift).to.not.be.null;
                    expect(moment(updatedShift.clockInTime).isSame('2010-10-20')).to.be.true;
                })
        });
        it('delete shift', function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    let mockedShift = utils.createMockedShiftPlainObject(moment(), createdCompany);
                    return ShiftModel.createShift(mockedShift)
                })
                .then((createdShift) => {
                    expect(createdShift).to.not.be.null;

                    return ShiftModel.deleteShift(createdShift._id)
                        .then(() => ShiftModel.getByShiftId(createdShift._id))
                })
                .then((deletedShift) => {
                    expect(deletedShift).to.be.null;
                })
        });
    })
});
