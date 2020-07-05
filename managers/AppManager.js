const ShiftModel = require('../models/ShiftModel');
const UserModel = require('../models/UserModel');
const CompanyModel = require('../models/CompanyModel');
const TaskModel = require('../models/TaskModel');
const ERoles = require ('../models/ERoles');
const moment = require('moment');
const {isAbsenceDaysEnable, isTasksEnable} = require("../managers/FeaturesManager");

const addShift = (shift) => {
    const user = shift.user;

    // Add the shift
    return ShiftModel.createShift(shift)
        .then((createShift) => {
            if (!!user && user.id) {
                // Add shift to user
                return UserModel.addShift(user.id, createShift)
                    .then(() => createShift);
            }
            return createShift;
        });
};

const removeShift = (shiftId) => {
    return ShiftModel.getByShiftId(shiftId)
        .then((shift) => {
            const user = shift.user;

            // Remove the shift itself
            return ShiftModel.deleteShift(shift.id)
                .then(() => {
                    // Remove shift from user
                    if (!!user && user.id)
                        UserModel.removeShift(user.id, shift);
                });
        });
};

const addUser = async (user) => {
    const company = user.company;

    // Add the user
    let createdUser = await UserModel.createUser(user)
    if (!!company && company.id) {
        // Add user to company
        await CompanyModel.addUser(company.id, createdUser)
    }
    return createdUser;
};

const removeUser = (userId) => {
    return UserModel.getByUserId(userId)
        .then((user) => {
            const company = user.company;

            // Remove user itself
            return UserModel.deleteUser(user.id)
                .then(() => {
                    // Remove user from company
                    if (!!company && company.id)
                        return CompanyModel.removeUser(company.id, user);
                    //ShiftModel.deleteAllShifts({user: user.id}); // Do we want to delete all user's shifts?
                });
        });
};

const registerCompanyManager = async (userData) => {
    let company = await CompanyModel.createCompany({});
    
    let user = {
        ...userData,
        role: ERoles.COMPANY_MANAGER,
        shifts: [],
        company,
    };

    return addUser(user);
};

const getShiftsInMonth = (year, month, company, userId) => {
    if (!year)
        throw new Error('[ShiftModel.getShiftsInMonth] - year is not valid');
    if (!month)
        throw new Error('[ShiftModel.getShiftsInMonth] - month is not valid');

    // moment consider month in a zero based
    month = month - 1;
    const startOfMonth = company.settings.startOfMonth;
    let startDate = moment().year(year).month(month).date(startOfMonth).startOf('day');
    let endDate = moment().year(year).month(month + 1).date(startOfMonth).startOf('day');

    return ShiftModel.getShiftsBetween(company, startDate, endDate, userId);
};

const getCompanyTasks = async company => {
    let tasks = isTasksEnable(company) ? await TaskModel.getByCompanyId(company._id) : [];
    let predefinedTasks = isAbsenceDaysEnable(company) ? await TaskModel.getPredefinedTasks() : [];
    return [...predefinedTasks, ...tasks];
};

module.exports = {
    addUser
    , removeUser
    , addShift
    , removeShift
    , registerCompanyManager
    , getShiftsInMonth
    , getCompanyTasks
};
