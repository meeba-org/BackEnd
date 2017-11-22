const FRIDAY = 5;
const SATURDAY = 6;
let holidays = {};
const rawHolidaysArray = require('../data/holidays');
const moment = require('moment');
const EDayType = require('./EDayType');

const isListedHoliday = (date, dayType) => {
    if (Object.keys(holidays).length === 0) {
        initHolidays();
    }

    return isHolidayExist(date, dayType);
};

const isHolidayExist = (date, dayType) => {
    let dateStr = date.format("YYYY-MM-DD");
    let holiday = holidays[dateStr];
    return !!holiday && !!holiday.dayType && holiday.dayType == dayType;
};

const initHolidays = () => {
    rawHolidaysArray.forEach(day => {
       holidays[day.date] = {
           name: day.hebrew,
           date: day.date,
           dayType: day.DayType,
       };
    });

    return holidays;
};

const isHoliday = (day) => {
    let momentDay = moment(day);
    return momentDay.day() === SATURDAY || isListedHoliday(momentDay, EDayType.Holiday);
};

const isHolidayEvening = (day) => {
    let momentDay = moment(day);

    return momentDay.day() === FRIDAY || isListedHoliday(momentDay, EDayType.HolidayEvening);
};

const analyzeDayType = (momentDay) => {
    if (isHoliday(momentDay))
        return EDayType.Holiday;
    else if (isHolidayEvening(momentDay))
        return EDayType.HolidayEvening;
    else
        return EDayType.Regular;
}

module.exports = {
    analyzeDayType,
    isListedHoliday,
    isHoliday,
    isHolidayEvening,
};
