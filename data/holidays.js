let EDataType = require('../models/EDayType');

module.exports = [
    // 2020
    {
        "link": "https://www.hebcal.com/holidays/pesach",
        "date": "2020-04-08",
        "category": "holiday",
        "memo": "Passover, the Feast of Unleavened Bread",
        "hebrew": "ערב פסח",
        "title": "ערב פסח",
        "title_orig": "Erev Pesach",
        DayType: EDataType.HolidayEvening
    },
    {
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2020-04-09",
        "title_orig": "Pesach I",
        "hebrew": "פסח יום א׳",
        "link": "https://www.hebcal.com/holidays/pesach",
        "category": "holiday",
        "yomtov": true,
        "subcat": "major",
        "title": "פסח יום א׳",
        DayType: EDataType.Holiday
    },
    {
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2020-04-10",
        "hebrew": "פסח יום ב׳",
        "title_orig": "Pesach II",
        "link": "https://www.hebcal.com/holidays/pesach",
        "category": "holiday",
        "title": "פסח יום ב׳",
        "subcat": "major",
        "yomtov": true
    },
    {
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/pesach",
        "subcat": "major",
        "title": "פסח יום ג׳ (חול המועד)",
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2020-04-11",
        "hebrew": "פסח יום ג׳ (חול המועד)",
        "title_orig": "Pesach III (CH''M)"
    },
    {
        "title": "פסח יום ד׳ (חול המועד)",
        "subcat": "major",
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/pesach",
        "hebrew": "פסח יום ד׳ (חול המועד)",
        "title_orig": "Pesach IV (CH''M)",
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2020-04-12"
    },
    {
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/pesach",
        "title": "פסח יום ה׳ (חול המועד)",
        "subcat": "major",
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2020-04-13",
        "hebrew": "פסח יום ה׳ (חול המועד)",
        "title_orig": "Pesach V (CH''M)"
    },
    {
        "link": "https://www.hebcal.com/holidays/pesach",
        "category": "holiday",
        "title": "פסח יום ו׳ (חול המועד)",
        "subcat": "major",
        "date": "2020-04-14",
        "memo": "Passover, the Feast of Unleavened Bread",
        "title_orig": "Pesach VI (CH''M)",
        "hebrew": "פסח יום ו׳ (חול המועד)",
        DayType: EDataType.HolidayEvening
    },
    {
        "title_orig": "Pesach VII",
        "hebrew": "פסח יום ז׳",
        "date": "2020-04-15",
        "memo": "Passover, the Feast of Unleavened Bread",
        "yomtov": true,
        "subcat": "major",
        "title": "פסח יום ז׳",
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/pesach",
        DayType: EDataType.Holiday
    },
    {
        "title_orig": "Pesach VIII",
        "hebrew": "פסח יום ח׳",
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2020-04-16",
        "yomtov": true,
        "subcat": "major",
        "title": "פסח יום ח׳",
        "link": "https://www.hebcal.com/holidays/pesach",
        "category": "holiday"
    },
    {
        "title": "Independence Day",
        "date": "2020-04-29",
        "hebrew": "יום העצמאות",
        "subcat": "major",
        "category": "holiday",
        DayType: EDataType.IndependenceDay
    },
    {
        "hebrew": "ערב שבועות",
        "title": "ערב שבועות",
        "title_orig": "Erev Shavuot",
        "memo": "Festival of Weeks, commemorates the giving of the Torah at Mount Sinai",
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/shavuot",
        "date": "2020-05-28",
        DayType: EDataType.HolidayEvening
    },
    {
        "hebrew": "שבועות יום א׳",
        "title_orig": "Shavuot I",
        "date": "2020-05-29",
        "memo": "Festival of Weeks, commemorates the giving of the Torah at Mount Sinai",
        "title": "שבועות יום א׳",
        "subcat": "major",
        "yomtov": true,
        "link": "https://www.hebcal.com/holidays/shavuot",
        "category": "holiday",
        DayType: EDataType.Holiday
    },
    {
        "hebrew": "שבועות יום ב׳",
        "title_orig": "Shavuot II",
        "memo": "Festival of Weeks, commemorates the giving of the Torah at Mount Sinai",
        "date": "2020-05-30",
        "title": "שבועות יום ב׳",
        "subcat": "major",
        "yomtov": true,
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/shavuot"
    },
    {
        "memo": "The Jewish New Year",
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "date": "2020-09-18",
        "title": "ערב ראש השנה",
        "hebrew": "ערב ראש השנה",
        "title_orig": "Erev Rosh Hashana",
        DayType: EDataType.HolidayEvening
    },
    {
        "yomtov": true,
        "title": "ראש השנה 5781",
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "title_orig": "Rosh Hashana 5781",
        "hebrew": "ראש השנה 5781",
        "memo": "The Jewish New Year",
        "date": "2020-09-19",
        DayType: EDataType.Holiday
    },
    {
        "memo": "The Jewish New Year",
        "date": "2020-09-20",
        "hebrew": "ראש השנה יום ב׳",
        "title_orig": "Rosh Hashana II",
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "category": "holiday",
        "title": "ראש השנה יום ב׳",
        "subcat": "major",
        "yomtov": true,
        DayType: EDataType.Holiday
    },
    {
        "title": "ערב יום כפור",
        "hebrew": "ערב יום כפור",
        "title_orig": "Erev Yom Kippur",
        "memo": "Day of Atonement",
        "date": "2020-09-27",
        "link": "https://www.hebcal.com/holidays/yom-kippur",
        "category": "holiday",
        DayType: EDataType.HolidayEvening
    },
    {
        "title_orig": "Yom Kippur",
        "hebrew": "יום כפור",
        "date": "2020-09-28",
        "memo": "Day of Atonement",
        "yomtov": true,
        "title": "יום כפור",
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/yom-kippur",
        "category": "holiday",
        DayType: EDataType.Holiday
    },
    {
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "yomtov": true,
        "subcat": "major",
        "title": "סוכות יום א׳",
        "date": "2020-10-03",
        "memo": "Feast of Tabernacles",
        "title_orig": "Sukkot I",
        "hebrew": "סוכות יום א׳",
        DayType: EDataType.Holiday
    },
    {
        "date": "2020-10-04",
        "memo": "Feast of Tabernacles",
        "title_orig": "Sukkot II",
        "hebrew": "סוכות יום ב׳",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "category": "holiday",
        "yomtov": true,
        "subcat": "major",
        "title": "סוכות יום ב׳"
    },
    {
        "date": "2020-10-05",
        "memo": "Feast of Tabernacles",
        "hebrew": "סוכות יום ג׳ (חול המועד)",
        "title_orig": "Sukkot III (CH''M)",
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "title": "סוכות יום ג׳ (חול המועד)",
        "subcat": "major"
    },
    {
        "date": "2020-10-06",
        "memo": "Feast of Tabernacles",
        "title_orig": "Sukkot IV (CH''M)",
        "hebrew": "סוכות יום ד׳ (חול המועד)",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "category": "holiday",
        "subcat": "major",
        "title": "סוכות יום ד׳ (חול המועד)"
    },
    {
        "subcat": "major",
        "title": "סוכות יום ה׳ (חול המועד)",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "category": "holiday",
        "title_orig": "Sukkot V (CH''M)",
        "hebrew": "סוכות יום ה׳ (חול המועד)",
        "date": "2020-10-07",
        "memo": "Feast of Tabernacles"
    },
    {
        "link": "https://www.hebcal.com/holidays/sukkot",
        "category": "holiday",
        "subcat": "major",
        "title": "סוכות יום ו׳ (חול המועד)",
        "date": "2020-10-08",
        "memo": "Feast of Tabernacles",
        "title_orig": "Sukkot VI (CH''M)",
        "hebrew": "סוכות יום ו׳ (חול המועד)"
    },
    {
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "subcat": "major",
        "title": "סוכות יום ז׳ (הושענא רבה)",
        "date": "2020-10-09",
        "memo": "Feast of Tabernacles",
        "title_orig": "Sukkot VII (Hoshana Raba)",
        "hebrew": "סוכות יום ז׳ (הושענא רבה)",
        DayType: EDataType.HolidayEvening
    },
    {
        "link": "https://www.hebcal.com/holidays/shmini-atzeret",
        "category": "holiday",
        "title": "שמיני עצרת",
        "subcat": "major",
        "yomtov": true,
        "memo": "Eighth Day of Assembly",
        "date": "2020-10-10",
        "hebrew": "שמיני עצרת",
        "title_orig": "Shmini Atzeret",
        DayType: EDataType.Holiday
    },
    {
        "yomtov": true,
        "subcat": "major",
        "title": "שמחת תורה",
        "link": "https://www.hebcal.com/holidays/simchat-torah",
        "category": "holiday",
        "title_orig": "Simchat Torah",
        "hebrew": "שמחת תורה",
        "memo": "Day of Celebrating the Torah",
        "date": "2020-10-11"
    },
    {
        "title_orig": "Chanukah: 1 Candle",
        "hebrew": "חנוכה: א׳ נר",
        "date": "2020-12-10",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "title": "חנוכה: א׳ נר",
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
    },
    {
        "link": "https://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "title": "חנוכה: ב׳ נרות",
        "subcat": "major",
        "date": "2020-12-11",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "title_orig": "Chanukah: 2 Candles",
        "hebrew": "חנוכה: ב׳ נרות"
    },
    {
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/chanukah",
        "subcat": "major",
        "title": "חנוכה: ג׳ נרות",
        "date": "2020-12-12",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "title_orig": "Chanukah: 3 Candles",
        "hebrew": "חנוכה: ג׳ נרות"
    },
    {
        "title": "חנוכה: ד׳ נרות",
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "title_orig": "Chanukah: 4 Candles",
        "hebrew": "חנוכה: ד׳ נרות",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2020-12-13"
    },
    {
        "subcat": "major",
        "title": "חנוכה: ה׳ נרות",
        "link": "https://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "title_orig": "Chanukah: 5 Candles",
        "hebrew": "חנוכה: ה׳ נרות",
        "date": "2020-12-14",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights"
    },
    {
        "title": "חנוכה: ו׳ נרות",
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "title_orig": "Chanukah: 6 Candles",
        "hebrew": "חנוכה: ו׳ נרות",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2020-12-15"
    },
    {
        "date": "2020-12-16",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "hebrew": "חנוכה: ז׳ נרות",
        "title_orig": "Chanukah: 7 Candles",
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/chanukah",
        "subcat": "major",
        "title": "חנוכה: ז׳ נרות"
    },
    {
        "link": "https://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "subcat": "major",
        "title": "חנוכה: ח׳ נרות",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2020-12-17",
        "title_orig": "Chanukah: 8 Candles",
        "hebrew": "חנוכה: ח׳ נרות"
    },
    {
        "title": "חנוכה: יום ח׳",
        "subcat": "major",
        "link": "https://www.hebcal.com/holidays/chanukah",
        "category": "holiday",
        "hebrew": "חנוכה: יום ח׳",
        "title_orig": "Chanukah: 8th Day",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2020-12-18"
    },

    // 2019
    {
        "link": "https://www.hebcal.com/holidays/purim",
        "title": "Elections",
        "date": "2019-04-09",
        "hebrew": "בחירות",
        "subcat": "major",
        "category": "holiday",
        DayType: EDataType.Holiday
    },
    {
        "category": "holiday",
        "memo": "Passover, the Feast of Unleavened Bread",
        "hebrew": "ערב פסח",
        "date": "2019-04-19",
        "title": "Erev Pesach",
        "link": "https://www.hebcal.com/holidays/pesach",
        DayType: EDataType.HolidayEvening
    },
    {
        "link": "https://www.hebcal.com/holidays/pesach",
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2019-04-20",
        "title": "Pesach I",
        "category": "holiday",
        "yomtov": true,
        "subcat": "major",
        "hebrew": "פסח יום א׳",
        DayType: EDataType.Holiday
    },
    {
        "link": "https://www.hebcal.com/holidays/pesach",
        "date": "2019-04-25",
        "title": "Pesach VI (CH''M)",
        "subcat": "major",
        "hebrew": "פסח יום ו׳ (חול המועד)",
        "category": "holiday",
        "memo": "Passover, the Feast of Unleavened Bread",
        DayType: EDataType.HolidayEvening
    },
    {
        "link": "https://www.hebcal.com/holidays/pesach",
        "memo": "Passover, the Feast of Unleavened Bread",
        "date": "2019-04-26",
        "title": "Pesach VII",
        "yomtov": true,
        "category": "holiday",
        "subcat": "major",
        "hebrew": "פסח יום ז׳",
        DayType: EDataType.Holiday
    },
    {
        "title": "Yom Hazikaron",
        "date": "2019-05-08",
        "hebrew": "יום הזיכרון",
        "subcat": "major",
        "category": "holiday",
        DayType: EDataType.HolidayEvening
    },
    {
        "title": "Independence Day",
        "date": "2019-05-09",
        "hebrew": "יום העצמאות",
        "subcat": "major",
        "category": "holiday",
        DayType: EDataType.IndependenceDay
    },
    {
        "memo": "Festival of Weeks, commemorates the giving of the Torah at Mount Sinai",
        "category": "holiday",
        "hebrew": "ערב שבועות",
        "title": "Erev Shavuot",
        "date": "2019-06-08",
        "link": "https://www.hebcal.com/holidays/shavuot",
        DayType: EDataType.HolidayEvening
    },
    {
        "memo": "Festival of Weeks, commemorates the giving of the Torah at Mount Sinai",
        "link": "https://www.hebcal.com/holidays/shavuot",
        "yomtov": true,
        "category": "holiday",
        "subcat": "major",
        "hebrew": "שבועות יום א׳",
        "date": "2019-06-09",
        "title": "Shavuot I",
        DayType: EDataType.Holiday
    },
    {
        "title": "Erev Rosh Hashana",
        "date": "2019-09-29",
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "memo": "The Jewish New Year",
        "category": "holiday",
        "hebrew": "ערב ראש השנה",
        DayType: EDataType.HolidayEvening
    },
    {
        "category": "holiday",
        "yomtov": true,
        "memo": "The Jewish New Year",
        "hebrew": "ראש השנה 5780",
        "date": "2019-09-30",
        "title": "Rosh Hashana 5780",
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        DayType: EDataType.Holiday
    },
    {
        "memo": "The Jewish New Year",
        "link": "https://www.hebcal.com/holidays/rosh-hashana",
        "yomtov": true,
        "category": "holiday",
        "hebrew": "ראש השנה יום ב׳",
        "subcat": "major",
        "title": "Rosh Hashana II",
        "date": "2019-10-01",
        DayType: EDataType.Holiday
    },
    {
        "link": "https://www.hebcal.com/holidays/yom-kippur",
        "title": "Erev Yom Kippur",
        "date": "2019-10-08",
        "hebrew": "ערב יום כפור",
        "memo": "Day of Atonement",
        "category": "holiday",
        DayType: EDataType.HolidayEvening
    },
    {
        "link": "https://www.hebcal.com/holidays/yom-kippur",
        "memo": "Day of Atonement",
        "date": "2019-10-09",
        "title": "Yom Kippur",
        "subcat": "major",
        "hebrew": "יום כפור",
        "category": "holiday",
        "yomtov": true,
        DayType: EDataType.Holiday
    },
    {
        "link": "https://www.hebcal.com/holidays/sukkot",
        "date": "2019-10-13",
        "title": "Erev Sukkot",
        "hebrew": "ערב סוכות",
        "category": "holiday",
        "memo": "Feast of Tabernacles",
        DayType: EDataType.HolidayEvening
    },
    {
        "memo": "Feast of Tabernacles",
        "link": "https://www.hebcal.com/holidays/sukkot",
        "yomtov": true,
        "category": "holiday",
        "hebrew": "סוכות יום א׳",
        "subcat": "major",
        "title": "Sukkot I",
        "date": "2019-10-14",
        DayType: EDataType.Holiday
    },
    {
        "link": "https://www.hebcal.com/holidays/sukkot",
        "date": "2019-10-20",
        "title": "Sukkot VII (Hoshana Raba)",
        "subcat": "major",
        "hebrew": "סוכות יום ז׳ (הושענא רבה)",
        "category": "holiday",
        "memo": "Feast of Tabernacles",
        DayType: EDataType.HolidayEvening
    },
    {
        "title": "Shmini Atzeret",
        "date": "2019-10-21",
        "hebrew": "שמיני עצרת",
        "subcat": "major",
        "yomtov": true,
        "category": "holiday",
        "link": "https://www.hebcal.com/holidays/shmini-atzeret",
        "memo": "Eighth Day of Assembly",
        DayType: EDataType.Holiday
    },

    // 2018
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
    // 2017
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
];
