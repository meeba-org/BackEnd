const utils = require("./testUtils");
const TIMEOUT = require("./testUtils").TIMEOUT;
const CompanyModel = require('../models/CompanyModel');
const UserModel = require('../models/UserModel');
const AppManager = require('../managers/AppManager');
const expect = require('chai').expect;

describe('AppManager', function() {
    beforeEach(function() {
        return utils.clearDB();
    });
    describe('addUser', function() {
        it('should add user to the company', function() {
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
                    CompanyModel.getByCompanyId(createdUser.company)
                        .then((updatedCompany) => {
                            expect(updatedCompany.users).to.have.length(1);
                            expect(updatedCompany.users[0].firstName.to.be.equal(createdUser.firstName));
                        });
                });
        }).timeout(TIMEOUT);
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
        }).timeout(TIMEOUT);
    });
});
