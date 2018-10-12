let EDataType = require('../models/EDayType');

module.exports = [
    {
        "link": "http://www.hebcal.com/holidays/rosh-hashana",
        "category": "holiday",
        "title": "Erev Rosh Hashana",
        "date": "2017-09-20",
        "memo": "The Jewish New Year",
        "hebrew": "ערב ראש השנה",
        DayType: EDataType.HolidayEvening
    },
    {
        "title": "Rosh Hashana 5778",
        "link": "http://www.hebcal.com/holidays/rosh-hashana",
        "category": "holiday",
        "yomtov": true,
        "memo": "The Jewish New Year",
        "hebrew": "ראש השנה 5778",
        "date": "2017-09-21",
        DayType: EDataType.Holiday
    },
    {
        "subcat": "major",
        "title": "Rosh Hashana II",
        "yomtov": true,
        "date": "2017-09-22",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/rosh-hashana",
        "memo": "The Jewish New Year",
        "hebrew": "ראש השנה יום ב׳",
        DayType: EDataType.Holiday
    },
    {
        "date": "2017-09-29",
        "memo": "Day of Atonement",
        "hebrew": "ערב יום כפור",
        "link": "http://www.hebcal.com/holidays/yom-kippur",
        "category": "holiday",
        "title": "Erev Yom Kippur",
        DayType: EDataType.HolidayEvening
    },
    {
        "memo": "Day of Atonement",
        "hebrew": "יום כפור",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/yom-kippur",
        "yomtov": true,
        "date": "2017-09-30",
        "title": "Yom Kippur",
        "subcat": "major",
        DayType: EDataType.Holiday
    },
    {
        "memo": "Feast of Tabernacles",
        "hebrew": "ערב סוכות",
        "date": "2017-10-04",
        "title": "Erev Sukkot",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/sukkot",
        DayType: EDataType.HolidayEvening

    },
    {
        "date": "2017-10-05",
        "yomtov": true,
        "title": "Sukkot I",
        "subcat": "major",
        "memo": "Feast of Tabernacles",
        "hebrew": "סוכות יום א׳",
        "link": "http://www.hebcal.com/holidays/sukkot",
        "category": "holiday",
        DayType: EDataType.HolidayEvening
    },
    {
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/sukkot",
        "hebrew": "סוכות יום ב׳",
        "memo": "Feast of Tabernacles",
        "title": "Sukkot II",
        "subcat": "major",
        "date": "2017-10-06",
        "yomtov": true,
        DayType: EDataType.Holiday
    },
    {
        "date": "2017-10-07",
        "memo": "Feast of Tabernacles",
        "hebrew": "סוכות יום ג׳ (חול המועד)",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/sukkot",
        "title": "Sukkot III (CH''M)",
        "subcat": "major"
    },
    {
        "date": "2017-10-08",
        "memo": "Feast of Tabernacles",
        "hebrew": "סוכות יום ד׳ (חול המועד)",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/sukkot",
        "subcat": "major",
        "title": "Sukkot IV (CH''M)"
    },
    {
        "title": "Sukkot V (CH''M)",
        "subcat": "major",
        "link": "http://www.hebcal.com/holidays/sukkot",
        "category": "holiday",
        "date": "2017-10-09",
        "memo": "Feast of Tabernacles",
        "hebrew": "סוכות יום ה׳ (חול המועד)"
    },
    {
        "link": "http://www.hebcal.com/holidays/sukkot",
        "category": "holiday",
        "title": "Sukkot VI (CH''M)",
        "subcat": "major",
        "memo": "Feast of Tabernacles",
        "hebrew": "סוכות יום ו׳ (חול המועד)",
        "date": "2017-10-10"
    },
    {
        "title": "Sukkot VII (Hoshana Raba)",
        "subcat": "major",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/sukkot",
        "hebrew": "סוכות יום ז׳ (הושענא רבה)",
        "memo": "Feast of Tabernacles",
        "date": "2017-10-11",
        DayType: EDataType.HolidayEvening
    },
    {
        "memo": "Eighth Day of Assembly",
        "hebrew": "שמיני עצרת",
        "link": "http://www.hebcal.com/holidays/shmini-atzeret",
        "category": "holiday",
        "date": "2017-10-12",
        "yomtov": true,
        "subcat": "major",
        "title": "Shmini Atzeret",
        DayType: EDataType.Holiday
    },
    {
        "memo": "Day of Celebrating the Torah",
        "hebrew": "שמחת תורה",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/simchat-torah",
        "yomtov": true,
        "date": "2017-10-13",
        "subcat": "major",
        "title": "Simchat Torah"
    },
    {
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "subcat": "major",
        "title": "Chanukah: 1 Candle",
        "hebrew": "חנוכה: א׳ נר",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2017-12-12"
    },
    {
        "link": "http://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "title": "Chanukah: 2 Candles",
        "subcat": "major",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "hebrew": "חנוכה: ב׳ נרות",
        "date": "2017-12-13"
    },
    {
        "subcat": "major",
        "title": "Chanukah: 3 Candles",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "date": "2017-12-14",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "hebrew": "חנוכה: ג׳ נרות"
    },
    {
        "title": "Chanukah: 4 Candles",
        "subcat": "major",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "hebrew": "חנוכה: ד׳ נרות",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2017-12-15"
    },
    {
        "hebrew": "חנוכה: ה׳ נרות",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2017-12-16",
        "subcat": "major",
        "title": "Chanukah: 5 Candles",
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/chanukah"
    },
    {
        "subcat": "major",
        "title": "Chanukah: 6 Candles",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "date": "2017-12-17",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "hebrew": "חנוכה: ו׳ נרות"
    },
    {
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2017-12-18",
        "hebrew": "חנוכה: ז׳ נרות",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "subcat": "major",
        "title": "Chanukah: 7 Candles"
    },
    {
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2017-12-19",
        "hebrew": "חנוכה: ח׳ נרות",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "title": "Chanukah: 8 Candles",
        "subcat": "major"
    },
    {
        "category": "holiday",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "title": "Chanukah: 8th Day",
        "subcat": "major",
        "date": "2017-12-20",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "hebrew": "חנוכה: יום ח׳"
    },
    {
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "memo": "The Jewish New Year",
        "hebrew": "ערב ראש השנה",
        "category": "holiday",
        "date": "2018-09-09",
        "title": "Erev Rosh Hashana",
        DayType: EDataType.HolidayEvening
    },
    {
        "memo": "The Jewish New Year",
        "yomtov": true,
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "title": "Rosh Hashana 5779",
        "date": "2018-09-10",
        "category": "holiday",
        "hebrew": "ראש השנה 5779",
        DayType: EDataType.Holiday
    },
    {
        "memo": "The Jewish New Year",
        "date": "2018-09-11",
        "title": "Rosh Hashana II",
        "hebrew": "ראש השנה יום ב׳",
        "yomtov": true,
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "category": "holiday",
        DayType: EDataType.Holiday
    },
    {
        "memo": "Day of Atonement",
        "link": "https://www.hebcal.com/holidays/yom-kippur",
        "category": "holiday",
        "date": "2018-09-18",
        "title": "Erev Yom Kippur",
        "hebrew": "ערב יום כפור",
        DayType: EDataType.HolidayEvening
    },
    {
        "memo": "Day of Atonement",
        "date": "2018-09-19",
        "title": "Yom Kippur",
        "hebrew": "יום כפור",
        "yomtov": true,
        "link": "https://www.hebcal.com/holidays/yom-kippur",
        "subcat": "major",
        "category": "holiday",
        DayType: EDataType.Holiday
    },
    {
        "memo": "Feast of Tabernacles",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "date": "2018-09-23",
        "category": "holiday",
        "title": "Erev Sukkot",
        "hebrew": "ערב סוכות",
        DayType: EDataType.HolidayEvening
    },
    {
        "category": "holiday",
        "yomtov": true,
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "title": "Sukkot I",
        "date": "2018-09-24",
        "hebrew": "סוכות יום א׳",
        "memo": "Feast of Tabernacles",
        DayType: EDataType.Holiday
    },
    {
        "date": "2018-09-30",
        "title": "Sukkot VII (Hoshana Raba)",
        "category": "holiday",
        "hebrew": "סוכות יום ז׳ (הושענא רבה)",
        "memo": "Feast of Tabernacles",
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/sukkot",
        DayType: EDataType.HolidayEvening
    },
    {
        "title": "Shmini Atzeret",
        "date": "2018-10-01",
        "hebrew": "שמיני עצרת",
        "memo": "Eighth Day of Assembly",
        "category": "holiday",
        "yomtov": true,
        "link": "https://www.hebcal.com/holidays/shmini-atzeret",
        "subcat": "major",
        DayType: EDataType.Holiday
    },
];
