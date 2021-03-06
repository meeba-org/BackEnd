const mongoose = require('mongoose');
const ETaskType = require("./ETaskType");
// Group Schema
const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        index: true,
        required: true,
    },
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null},
    type: {type: String, default: ETaskType.REGULAR},
    isInnovative: {type: Boolean, default: false}
});

const Task = mongoose.model('Task', TaskSchema);

function createTaskInstance(task) {
    let newTask = new Task();
    Object.assign(newTask, task);
    return newTask;
}

const getAllTasks = () => {
    return Task.find().exec();
};

const getByTaskId = (id) => {
    return Task.findById(id).exec();
};

const getByCompanyId = (companyId) => {
    return Task.find({company: companyId}).exec();
};

const createTask = (task) => {
    let newTask = createTaskInstance(task);

    return newTask.save();
};

const updateTask = (task) => {
    let newTask = createTaskInstance(task);
    newTask._id = task._id;

    newTask = newTask.toObject();
    return Task.findOneAndUpdate({'_id': newTask._id}, newTask, {upsert: true, new: true}).exec();
};

const deleteTask = (id) => {
    return Task.deleteOne({_id: id}).exec();
};

const deleteAllTasks = (conditions) => {
    if (!conditions)
        conditions = {};
    return Task.deleteMany(conditions).exec();
};

const tasksCount = () => Task.countDocuments().exec();

const getPredefinedTasks = () => Task.find({type: {$ne: ETaskType.REGULAR}}).exec();

module.exports = {
    createTask
    , getByTaskId
    , getByCompanyId
    , getAllTasks
    , updateTask
    , deleteTask
    , deleteAllTasks
    , tasksCount
    , getPredefinedTasks
};
