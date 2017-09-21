const utils = require("./testUtils");
const TIMEOUT = require("./testUtils").TIMEOUT;
const CompanyModel = require('../models/CompanyModel');
const UserModel = require('../models/UserModel');
const ShiftModel = require('../models/ShiftModel');
const AppManager = require('../managers/AppManager');
const expect = require('chai').expect;

describe('AppManager', function() {
    this.timeout(TIMEOUT);
    beforeEach(function() {
        return utils.clearDB();
    });

    describe('addUser', function() {
        it('should add user to the company', function () {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    newUser.company = createdCompany;
                    return AppManager.addUser(newUser);
                })
                .then((createdUser) => {
                    expect(createdUser.firstName).to.exist;
                    expect(createdUser.company).to.exist;
                    return CompanyModel.getByCompanyId(createdUser.company)
                        .then((updatedCompany) => {
                            expect(updatedCompany.users).to.have.length(1);
                            expect(updatedCompany.users[0].firstName === createdUser.firstName);
                            return Promise.resolve();
                        });
                });
        });
    });

    describe('removeUser', function() {
        it('should remove user from the company', function() {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();
            let createdCompany;

            return CompanyModel.createCompany(newCompany)
                .then((newCreatedCompany) => {
                    newUser.company = createdCompany = newCreatedCompany;
                    return AppManager.addUser(newUser);
                })
                .then((createdUser) => AppManager.removeUser(createdUser.id))
                .then(() => UserModel.count())
                .then((result) => expect(result).to.be.equal(0))
                .then(() => CompanyModel.getByCompanyId(createdCompany.id))
                .then((company) => expect(company.users).to.have.length(0))
        });
    });

    describe('addShift', function() {
        it('should add shift to a user', function() {
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
        })
    })
    describe('removeShift', function() {
        it('should remove shift from user', function() {
            let newUser = utils.createMockedUserPlainObject();
            let newShift = utils.createMockedShiftPlainObject();
            let createdUser;

            return UserModel.createUser(newUser)
                .then((newCreatedUser) => {
                    newShift.user = createdUser = newCreatedUser;
                    return AppManager.addShift(newShift);
                })
                .then((createdShift) => AppManager.removeShift(createdShift.id))
                .then(() => ShiftModel.count())
                .then((shiftsCount) => expect(shiftsCount).to.be.equal(0))
                .then(() => UserModel.getByUserId(createdUser.id))
                .then((user) => expect(user.shifts).to.have.length(0))
        });
    })
})
