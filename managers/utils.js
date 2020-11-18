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

module.exports = {
    isValidEmail,
    isEmptyObject,
    getFirstLocation
};
