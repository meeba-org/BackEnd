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

module.exports = {
    isValidEmail,
    isEmptyObject
};
