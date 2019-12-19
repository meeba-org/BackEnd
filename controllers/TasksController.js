'use strict';

const TaskModel = require('../models/TaskModel');
const CompanyModel = require('../models/CompanyModel');
const express = require('express');
const {reject, resolve} = require("./apiManager");
const routeWrapper = require("./apiManager").routeWrapper;
const router = express.Router();
const { body, param } = require('express-validator/check');
const jwtService = require("./jwtService");
const {isAbsenceDaysEnable} = require("../managers/CompnayHelper");

//GET /tasks/{id} task
router.get('/:id',
    [
        param('id').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return TaskModel.getByTaskId(id)
            .then((task) => {
                if (task)
                    return resolve(task);
                return reject("Task with id " + id + " does not exist", 401);
            });
    })
);

//GET /company/:companyId tasks
router.get('/',
    (req, res) => routeWrapper(req, res, async (req, res) => {
        let companyFromLocals = jwtService.getCompanyFromLocals(res);
        const company = await CompanyModel.getByCompanyId(companyFromLocals._id);
        let tasks = await TaskModel.getByCompanyId(company._id);
        let predefinedTasks = isAbsenceDaysEnable(company) ? await TaskModel.getPredefinedTasks() : [];
        return [...predefinedTasks, ...tasks];
    })
);

//POST /tasks task
router.post('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        return TaskModel.createTask(req.body);
    })
);

//PUT /tasks task
router.put('/',
    [
        body('_id').exists()
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        let newTask = req.body;

        return TaskModel.updateTask(newTask);
    })
);

//DELETE /tasks/{id} taskId
/* Not in used */
router.delete('/:id',
    [
        param('id').exists(),
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return TaskModel.deleteTask(id)
            .then(() => id);
    })
);

module.exports = router;
