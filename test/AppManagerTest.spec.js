const utils = require("./testUtils");
const TIMEOUT = require("./testUtils").TIMEOUT;
const CompanyModel = require('../models/CompanyModel');
const UserModel = require('../models/UserModel');
const ShiftModel = require('../models/ShiftModel');
const AppManager = require('../managers/AppManager');
const expect = require('chai').expect;

describe('AppManager', function () {
    describe('addUser', function () {
        it('should add user to the company', function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    newUser.company = createdCompany;
                    return AppManager.addUser(newUser);
                })
                .then((createdUser) => {
                    expect(createdUser.fullName).to.exist;
                    expect(createdUser.company).to.exist;
                    return CompanyModel.getByCompanyId(createdUser.company)
                        .then((updatedCompany) => {
                            expect(updatedCompany.users).to.have.length(1);
                            expect(updatedCompany.users[0].fullName === createdUser.fullName);
                            return Promise.resolve();
                        });
                });
        });
    });

    describe('removeUser', function () {
        it('should remove user from the company', async () => {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();

            let newCreatedCompany = await CompanyModel.createCompany(newCompany);
            newUser.company  = newCreatedCompany;
            let createdUser = await AppManager.addUser(newUser);
            await AppManager.removeUser(createdUser.id);
            let result = await UserModel.usersCount(true);
            expect(result).to.be.equal(0);
            let company = await CompanyModel.getByCompanyId(newCreatedCompany.id);
            expect(company.users).to.have.length(0);
        });
    });

    describe('addShift', function () {
        it('should add shift to a user', function () {
            let newShift = utils.createMockedShiftPlainObject();
            let newUser = utils.createMockedUserPlainObject();

            return UserModel.createUser(newUser)
                .then((createdUser) => {
                    newShift.user = createdUser;
                    return AppManager.addShift(newShift);
                })
                .then((createdShift) => {
                    expect(createdShift.clockOutTime).to.exist;
                    expect(createdShift.user).to.exist;
                    return UserModel.getByUserId(createdShift.user)
                        .then((user) => {
                            expect(user.shifts).to.have.length(1);
                            expect(user.shifts[0].clockInTime).to.exist;
                        });
                });
        });
    });
    describe('removeShift', function () {
        it('should remove shift from user', function () {
            let newUser = utils.createMockedUserPlainObject();
            let newShift = utils.createMockedShiftPlainObject();
            let createdUser;

            return UserModel.createUser(newUser)
                .then((newCreatedUser) => {
                    newShift.user = createdUser = newCreatedUser;
                    return AppManager.addShift(newShift);
                })
                .then((createdShift) => AppManager.removeShift(createdShift.id))
                .then(() => ShiftModel.shiftsCount())
                .then((shiftsCount) => expect(shiftsCount).to.be.equal(0))
                .then(() => UserModel.getByUserId(createdUser.id))
                .then((user) => expect(user.shifts).to.have.length(0));
        });
        it('fail test', () => {
            expect(1).to.equal(2);
        });
    });
});
