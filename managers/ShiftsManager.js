const ShiftModel = require('../models/ShiftModel');
const UserModel = require('../models/UserModel');

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
    UserModel.addShift(user, shift);
    return ShiftModel.createShift(shift);
};

module.exports.removeShift = (shiftId) => {
    return ShiftModel.getByShiftId(shiftId)
        .then((shift) => {
            const user = shift.user;
            UserModel.removeShift(user.id, shift);
            return ShiftModel.deleteShift(shift.uid);
        });
};
