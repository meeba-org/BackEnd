const FRIDAY = "5";
const SATURDAY = "6";

const DayType = {
    Regular: 0,
    HolidayEvening: 1,
    Holiday: 2,
};

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
    isHoliday,
    isHolidayEvening,
};
