const utils = require("./testUtils");
const TIMEOUT = require("./testUtils").TIMEOUT;
const CompanyModel = require('../models/CompanyModel');
const UsersManager = require('../managers/UsersManager');
const expect = require('chai').expect;

describe('UsersManager', () => {
    beforeEach(() => {
        utils.clearDB();
    });
    describe('addUser', () => {
        it('should add user to the company', () => {
            let newCompany = utils.createMockedCompanyPlainObject("Toluna");
            let newUser = utils.createMockedUserPlainObject();

            return CompanyModel.createCompany(newCompany)
                .then((createdCompany) => {
                    newUser.company = createdCompany;

                    return UsersManager.addUser(newUser);
                })
                .then((createdUser) => {
                    expect(createdUser.first_name).to.exist;
                    expect(createdUser.company).to.exist;
                });
        });
    });
}).timeout(TIMEOUT);
