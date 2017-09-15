const ShiftModel = require('../models/ShiftModel');

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
