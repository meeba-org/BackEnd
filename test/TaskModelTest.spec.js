const TaskModel = require("../models/TaskModel");
const TIMEOUT = require("./testUtils").TIMEOUT;
const moment = require('moment');
const expect = require('chai').expect;
const utils = require("./testUtils");

describe('Tasks', function () {
    this.timeout(TIMEOUT);

    describe('Post', function () {
        it('should insert new root task', function () {
            let rootTask = utils.createMockedTaskPlainObject("Development", null, []);

            return TaskModel.createTask(rootTask)
                .then(task => {
                    expect(task).to.not.be.null;
                    expect(task.name).to.be.equal("Development");
                })
        })
    });

    describe('Put', function () {
        it('should update a task', function () {
            let rootTask = utils.createMockedTaskPlainObject("Development", null, []);

            return TaskModel.createTask(rootTask)
                .then(task => {
                    expect(task).to.not.be.null;

                    task.name = "QA";
                    return TaskModel.updateTask(task)
                        .then(updatedTask => {
                            expect(task.name).to.be.equal("QA");
                        })
                })
        })
    });
});
