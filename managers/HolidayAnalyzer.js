const FRIDAY = 5;
const SATURDAY = 6;
let holidays = {};
const rawHolidays = require('../data/holidays.json');
const moment = require('moment');

const DayType = {
    Regular: 0,
    HolidayEvening: 1,
    Holiday: 2,
};

const isListedHoliday = (date) => {
    if (Object.keys(holidays).length === 0) {
        initHolidays();
    }

    return isHolidayExist(date);
};

const isHolidayExist = (date) => {
    return date in holidays;
};

const initHolidays = () => {
    let year = moment().year();
    if (!(year in rawHolidays))
        throw new Error("[HolidayAnalyzer.initHolidays] - could not find year " + year);

    let holidaysRawArray = rawHolidays[year];
    holidaysRawArray.forEach(day => {
       holidays[day.date] = {
           name: day.hebrew,
           date: day.date
       };
    });

    return holidays;
};

const isHoliday = (momentDay) => {
    return moment(momentDay).day() === SATURDAY;
};

const isHolidayEvening = (momentDay) => {
    return moment(momentDay).day() === FRIDAY;
};

const analyzeDayType = (momentDay) => {
    if (isHoliday(momentDay))
        return DayType.Holiday;
    else if (isHolidayEvening(momentDay))
        return DayType.HolidayEvening;
    else
        return DayType.Regular;
}

module.exports = {
    DayType,
    analyzeDayType,
    isListedHoliday,
    isHoliday,
    isHolidayEvening
};
