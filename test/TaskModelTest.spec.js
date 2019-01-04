const TaskModel = require("../models/TaskModel");
const TIMEOUT = require("./testUtils").TIMEOUT;
const moment = require('moment');
const expect = require('chai').expect;
const utils = require("./testUtils");

describe('Tasks', function () {
    this.timeout(TIMEOUT);

    describe('Post', function () {
        it('should insert new root task', function () {
            let rootTask = utils.createMockedTaskPlainObject("Development", "Toluna", null, []);

            return TaskModel.createTask(rootTask)
                .then(task => {
                    expect(task).to.not.be.null;
                    // expect(task).to.have.length(2);
                })
        })
    })
});
