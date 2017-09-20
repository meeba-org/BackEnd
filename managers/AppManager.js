const ShiftModel = require('../models/ShiftModel');
const UserModel = require('../models/UserModel');
const CompanyModel = require('../models/CompanyModel');

module.exports.createOrUpdateShift = (shift) => {
    ShiftModel.getLastOpenShiftByUid(shift.uid)
        .then((shift) => {
            if (shift) {
                // Shift exist --> update startTime as current
                return ShiftModel.updateShift(shift);
            }
            else {
                return ShiftModel.createShift(shift);
            }
        });
};

module.exports.addShift = (shift) => {
    const user = shift.user;

    // Add the shift
    return ShiftModel.createShift(shift)
        .then((createShift) => {
            if (!!user && user.id) {
                // Add shift to user
                return UserModel.addShift(user, shift)
                    .then(() => createShift)
            }
            return createShift;
        })


};

// TODO make it like removeUser
module.exports.removeShift = (shiftId) => {
    return ShiftModel.getByShiftId(shiftId)
        .then((shift) => {
            const user = shift.user;

            // Remove shift from user
            if (!!user && user.id)
                UserModel.removeShift(user.id, shift);

            // Remove the shift itself
            return ShiftModel.deleteShift(shift.uid);
        });
};

module.exports.addUser = (user) => {
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

module.exports.removeUser = (userId) => {
    return UserModel.getByUserId(userId)
        .then((user) => {
            const currentUser = user;
            const company = user.company;

            // Remove user itself
            return UserModel.deleteUser(currentUser.id)
                .then(() => {
                    // Remove user from company
                    if (!!company && company.id)
                        return CompanyModel.removeUser(company.id, user);
                    //ShiftModel.deleteAllShifts({user: user.id}); // Do we want to delete all user's shifts?
                });
        });
};
