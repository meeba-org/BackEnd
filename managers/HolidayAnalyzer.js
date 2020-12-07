const FRIDAY = 5;
const SATURDAY = 6;
let holidays = {};
const rawHolidaysArray = require('../data/holidays');
const moment = require('moment');
const EDayType = require('../models/EDayType');

const isListedHoliday = (date, dayType) => {
    return isHolidayExist(date, dayType);
};

const getHoliday = (date) => {
    let dateStr = moment(date).format("YYYY-MM-DD");
    return holidays[dateStr];
};

const isHolidayExist = (date, dayType) => {
    let dateStr = moment(date).format("YYYY-MM-DD");
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

const isIndependenceDay = (day) => {
    let momentDay = moment(day);
    return isListedHoliday(momentDay, EDayType.IndependenceDay);
};

const isHoliday = (day) => {
    let momentDay = moment(day);
    return momentDay.day() === SATURDAY || isListedHoliday(momentDay, EDayType.Holiday);
};

const isHolidayEvening = (day) => {
    let momentDay = moment(day);

    return momentDay.day() === FRIDAY || isListedHoliday(momentDay, EDayType.HolidayEvening);
};

const getHolidayName = (day) => {
    let holiday = getHoliday(day);
    if (!holiday)
        return "";

    return holiday.name;
};

const analyzeDayType = (momentDay) => {
    if (isHoliday(momentDay))
        return EDayType.Holiday;
    else if (isHolidayEvening(momentDay))
        return EDayType.HolidayEvening;
    else if (isIndependenceDay(momentDay))
        return EDayType.IndependenceDay;
    else
        return EDayType.Regular;
};

initHolidays();

module.exports = {
    analyzeDayType,
    isListedHoliday,
    isHoliday,
    isHolidayEvening,
    isIndependenceDay,
    getHolidayName,
};
