import {createShift, deleteShift, getByShiftId, getShiftsBetween} from "../models/ShiftModel";
import {addShift, createUser, deleteUser, getByUserId, removeShift} from "../models/UserModel";

const ERoles = require ('../models/ERoles');
const moment = require('moment');

const addShift = (shift) => {
    const user = shift.user;

    // Add the shift
    return createShift(shift)
        .then((createShift) => {
            if (!!user && user.id) {
                // Add shift to user
                return addShift(user.id, createShift)
                    .then(() => createShift);
            }
            return createShift;
        });
};

const removeShift = (shiftId) => {
    return getByShiftId(shiftId)
        .then((shift) => {
            const user = shift.user;

            // Remove the shift itself
            return deleteShift(shift.id)
                .then(() => {
                    // Remove shift from user
                    if (!!user && user.id)
                        removeShift(user.id, shift);
                });
        });
};

const addUser = (user) => {
    const company = user.company;

    // Add the user
    return createUser(user)
        .then((createdUser) => {
            if (!!company && company.id) {
                // Add user to company
                return CompanyModel.addUser(company.id, createdUser)
                    .then(() => createdUser);
            }
            return createdUser;
        });
};

const removeUser = (userId) => {
    return getByUserId(userId)
        .then((user) => {
            const company = user.company;

            // Remove user itself
            return deleteUser(user.id)
                .then(() => {
                    // Remove user from company
                    if (!!company && company.id)
                        return CompanyModel.removeUser(company.id, user);
                    //ShiftModel.deleteAllShifts({user: user.id}); // Do we want to delete all user's shifts?
                });
        });
};

const registerCompanyManager = (username, password) => {
    return CompanyModel.createCompany({})
        .then(company => {
            let user = {
                username,
                password,
                role: ERoles.COMPANY_MANAGER,
                shifts: [],
                company,
            };

            return addUser(user);
        });
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

    return getShiftsBetween(company, startDate, endDate, userId);
};

module.exports = {
    addUser
    , removeUser
    , addShift
    , removeShift
    , registerCompanyManager
    , getShiftsInMonth
};
