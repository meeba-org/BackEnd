const ShiftModel = require('../models/ShiftModel');
const UserModel = require('../models/UserModel');
const CompanyModel = require('../models/CompanyModel');

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

const addUser = (user) => {
    const company = user.company;

    // Add the useer
    return UserModel.createUser(user)
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

module.exports = {
    addUser
    , removeUser
    , addShift
    , removeShift
};
