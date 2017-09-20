const utils = require("./testUtils");
const TIMEOUT = require("./testUtils").TIMEOUT;
const CompanyModel = require('../models/CompanyModel');
const AppManager = require('../managers/AppManager');
const expect = require('chai').expect;

describe('AppManager', function() {
    beforeEach(function() {
        return utils.clearDB();
    });
    describe('addUser', function() {
        it.only('should add user to the company', function() {
            console.log("addUser 1");
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    newUser.company = createdCompany;
                    console.log("addUser 2");
                    return AppManager.addUser(newUser);
                })
                .then((createdUser) => {
                    expect(createdUser.firstName).to.exist;
                    expect(createdUser.company).to.exist;
                    return CompanyModel.getByCompanyId(createdUser.company)
                        .then((updatedCompany) => {
                            console.log("addUser 3");
                            expect(updatedCompany.users).to.have.length(1);
                            expect(updatedCompany.users[0].firstName === createdUser.firstName);
                        });
                });
        }).timeout(TIMEOUT);
    });

    // describe('removeUser', function() {
    //     it('should remove user from the company', function() {
    //         let newCompany = utils.createMockedCompanyPlainObject("Toluna");
    //         let newUser = utils.createMockedUserPlainObject();
    //         let createdCompany;
    //
    //         return CompanyModel.createCompany(newCompany)
    //             .then((newCreatedCompany) => {
    //                 newUser.company = createdCompany = newCreatedCompany;
    //                 return AppManager.addUser(newUser);
    //             })
    //             .then((createdUser) => AppManager.removeUser(createdUser.id))
    //             .then(() => UserModel.count())
    //             .then((result) => expect(result).to.be.equal(0))
    //             .then(() => CompanyModel.getByCompanyId(createdCompany.id))
    //             .then((company) => expect(company.users).to.have.length(0))
    //     }).timeout(TIMEOUT);
    // });

    // describe('addShift', function() {
    //     // TODO
    // })
    // describe('removeShift', function() {
    //     // TODO
    // })
});
