const {REGULAR} = require("../models/ETaskType");
const isValidEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

/*!
 * Determines if `val` is an object that has no own keys
 */
const isEmptyObject = val => val != null &&
    typeof val === 'object' &&
    Object.keys(val).length === 0;

const getFirstLocation = shift => {
    if (!shift)
        return null;
    
    if (shift.locations && shift.locations.length > 0)
        return shift.locations[0];
    
    return shift.location;
};

const parse2DigitsFloat = floatNum => parseFloat(floatNum.toFixed(2));

// Shift which is not related to task or related to task of type REFULAR
const isRegularShift = task => {
    return !task || task && task.type === REGULAR;
};

const isInnovativeTaskRelatedShift = task => {
    return task && task.isInnovative;
};

module.exports = {
    isValidEmail,
    isEmptyObject,
    getFirstLocation,
    parse2DigitsFloat,  
    isRegularShift,
    isInnovativeTaskRelatedShift,
};
