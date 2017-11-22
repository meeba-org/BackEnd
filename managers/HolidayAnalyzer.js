const FRIDAY = 5;
const SATURDAY = 6;
let holidays = null;

const DayType = {
    Regular: 0,
    HolidayEvening: 1,
    Holiday: 2,
};

const isListedHoliday = (date) => {
    if (!holidays) {
        initHolidays();
    }

    return isHolidayExist(date);
};

const initHolidays() {
    
}

const isHoliday = (momentDay) => {
    return momentDay.day() === SATURDAY;
};

const isHolidayEvening = (momentDay) => {
    return momentDay.day() === FRIDAY;
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
};
