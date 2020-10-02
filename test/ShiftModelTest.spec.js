const utils = require("./testUtils");
const CompanyModel = require("../models/CompanyModel");
const TIMEOUT = require("./testUtils").TIMEOUT;
const moment = require('moment');
const ShiftModel = require("../models/ShiftModel");
const AppManager = require('../managers/AppManager');
const UserModel = require("../models/UserModel");
const expect = require('chai').expect;

describe('Shifts', function () {
    this.timeout(TIMEOUT);

    describe('getShiftsInMonth', function () {
        it('should return shifts of a specific month', async function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();
            
            const year = 2017;
            const month = 5;
            let createdCompany;

            let company = await CompanyModel.createCompany(newCompany);
            let user = await UserModel.createUser(newUser);
            createdCompany = company;

            let shift1ClockInTime = moment().year(year).month(month).date(3).hour(8);
            let shift1 = utils.createMockedShiftPlainObject(shift1ClockInTime, company, user);
            await ShiftModel.createShift(shift1);

            let shift2ClockInTime = moment().year(year).month(month).date(10).hour(8);
            let shift2 = utils.createMockedShiftPlainObject(shift2ClockInTime, createdCompany, user);
            await ShiftModel.createShift(shift2);

            // This shift is created in a different month!
            let shift3ClockInTime = moment().year(year).month(month + 1).date(22).hour(8);
            let shift3 = utils.createMockedShiftPlainObject(shift3ClockInTime, createdCompany, user);
            await ShiftModel.createShift(shift3);

            let shifts = await AppManager.getShiftsInMonth(year, month + 1, createdCompany);
            expect(shifts).to.not.be.null;
            expect(shifts).to.have.length(2);
        });
        
        it('should return shifts of a specific month for a specific user', async function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newRawUser = utils.createMockedUserPlainObject();
            let someoneElseRawUser = utils.createMockedUserPlainObject("someoneElse");
            const year = 2017;
            const month = 5;

            let company = await CompanyModel.createCompany(newCompany);

            newRawUser.company = company;
            someoneElseRawUser.company = company;
            let user = await AppManager.addUser(newRawUser);
            let someoneElseUser = await AppManager.addUser(someoneElseRawUser);

            let shift1ClockInTime = moment().year(year).month(month).date(3).hour(8);
            let shift1 = utils.createMockedShiftPlainObject(shift1ClockInTime, user.company, user);
            await ShiftModel.createShift(shift1);

            let shift2ClockInTime = moment().year(year).month(month).date(10).hour(8);
            let shift2 = utils.createMockedShiftPlainObject(shift2ClockInTime, company, someoneElseUser);
            await ShiftModel.createShift(shift2);

            let shift3ClockInTime = moment().year(year).month(month).date(22).hour(8);
            let shift3 = utils.createMockedShiftPlainObject(shift3ClockInTime, user.company, user);
            await ShiftModel.createShift(shift3);

            let shifts = await AppManager.getShiftsInMonth(year, month + 1, user.company, user._id);
            expect(shifts).to.not.be.null;
            expect(shifts).to.have.length(2);
        });
    });

    describe('ShiftModel - CRUD Operations', function () {
        it('create shift', async function () {
            let rawCompany = utils.createMockedCompanyPlainObject("Toluna");
            let rawUser = utils.createMockedUserPlainObject();
            let time = '2010-10-20 09:30';
            let someMoment = moment(time);

            let createdCompany = await CompanyModel.createCompany(rawCompany);
            let user = await UserModel.createUser(rawUser);
            let mockedShift = utils.createMockedShiftPlainObject(someMoment, createdCompany, user);
            let createdShift = await ShiftModel.createShift(mockedShift);
            expect(createdShift).to.not.be.null;
            expect(moment(createdShift.clockInTime).isSame(time)).to.be.true;

            // Checking that only one created
            let shifts = await ShiftModel.getShiftsBetween(createdShift.company, moment(someMoment).startOf('day'), moment(someMoment).endOf('day'))
            expect(shifts.length).to.be.equals(1);
        });

        it('update shift', async function () {
            let rawCompany = utils.createMockedCompanyPlainObject("Toluna");
            let rawUser = utils.createMockedUserPlainObject();

            let createdCompany = await CompanyModel.createCompany(rawCompany);
            let user = await UserModel.createUser(rawUser);
            
            let mockedShift = utils.createMockedShiftPlainObject(moment(), createdCompany, user);
            let createdShift = await ShiftModel.createShift(mockedShift);
            expect(createdShift).to.not.be.null;
            createdShift.clockInTime = moment('2010-10-20');

            let updatedShift = await ShiftModel.updateShift(createdShift);
            expect(updatedShift).to.not.be.null;
            expect(moment(updatedShift.clockInTime).isSame('2010-10-20')).to.be.true;
        });
        
        it('delete shift', async function () {
            let rawCompany = utils.createMockedCompanyPlainObject("Toluna");
            let rawUser = utils.createMockedUserPlainObject();
            
            let company = await CompanyModel.createCompany(rawCompany);
            let user = await UserModel.createUser(rawUser);
            let mockedShift = utils.createMockedShiftPlainObject(moment(), company, user);
            let createdShift = await ShiftModel.createShift(mockedShift);
            expect(createdShift).to.not.be.null;

            await ShiftModel.deleteShift(createdShift._id);
            let deletedShift = await ShiftModel.getByShiftId(createdShift._id);
            expect(deletedShift).to.be.null;
        });
    });
});
