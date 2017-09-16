const utils = require("./testUtils");
const TIMEOUT = require("./testUtils").TIMEOUT;
const CompanyModel = require('../models/CompanyModel');
const UsersManager = require('../managers/UsersManager');
const expect = require('chai').expect;

describe('UsersManager', function() {
    beforeEach(function() {
        utils.clearDB();
    });
    describe('addUser', function() {
        it('should add user to the company', function() {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    newUser.company = createdCompany;
                    return UsersManager.addUser(newUser);
                })
                .then((createdUser) => {
                    expect(createdUser.firstName).to.exist;
                    expect(createdUser.company).to.exist;
                    CompanyModel.getByCompanyId(createdUser.company)
                        .then((updatedCompany) => {
                            expect(updatedCompany.users).to.have.length(1);
                        })
                });
        }).timeout(TIMEOUT);
    });
});
