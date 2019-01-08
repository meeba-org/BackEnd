const TaskModel = require("../models/TaskModel");
const TIMEOUT = require("./testUtils").TIMEOUT;
const moment = require('moment');
const expect = require('chai').expect;
const utils = require("./testUtils");

describe('Tasks', function () {
    this.timeout(TIMEOUT);

    describe('CRUD Operations', function () {

        describe('Post', function () {
            it('should insert new root task', function () {
                let rootTask = utils.createMockedTaskPlainObject("Development");

                return TaskModel.createTask(rootTask)
                    .then(task => {
                        expect(task).to.not.be.null;
                        expect(task.name).to.be.equal("Development");
                    })
            })
        });

        describe('Get', function () {
            it('should get a new task', function () {
                let rootTask = utils.createMockedTaskPlainObject("Development");

                return TaskModel.createTask(rootTask)
                    .then(task => {
                        expect(task).to.not.be.null;
                        return task;
                    })
                    .then(createdTask => TaskModel.getByTaskId(createdTask.id))
                    .then(fetchedTask => {
                        expect(fetchedTask).to.not.be.null;
                    })
            })
        });

        describe('Put', function () {
            it('should update a task', function () {
                let rootTask = utils.createMockedTaskPlainObject("Development");

                return TaskModel.createTask(rootTask)
                    .then(task => {
                        expect(task).to.not.be.null;

                        task.name = "QA";
                        return TaskModel.updateTask(task)
                            .then(updatedTask => {
                                expect(updatedTask.name).to.be.equal("QA");
                            })
                    })
            })
        });

        describe('Delete', function () {
            it('should delete a task', function () {
                let task = utils.createMockedTaskPlainObject("Development");

                return TaskModel.createTask(task)
                    .then(createdTask => {
                        expect(createdTask).to.not.be.null;
                        return createdTask;
                    })
                    .then(createdTask => {
                        TaskModel.deleteTask(createdTask.id)
                        return createdTask;
                    })
                    .then((deletedTask) => {
                        return TaskModel.getByTaskId(deletedTask.id)
                    })
                    .then(retrievedTask => {
                        expect(retrievedTask).to.be.null;
                    });
            })
        });
    });

    describe('Tree tasks', function () {
        it('should create a tree of tasks', function () {
            return TaskModel.createTask(utils.createMockedTaskPlainObject("Root"))
                .then(rootTask => {
                    return Promise.all([
                        TaskModel.createTask(utils.createMockedTaskPlainObject("task1Level1", rootTask)),
                        TaskModel.createTask(utils.createMockedTaskPlainObject("task2Level1", rootTask)),
                    ])
                        .then(childTasks => {
                            expect(childTasks).not.to.be.null;
                            expect(childTasks).to.have.length(2);
                        });
                });
        });
    });
});
