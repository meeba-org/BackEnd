const moment = require('moment');
const EDayType = require('../models/EDayType');
const expect = require('chai').expect;
let {isListedHoliday, isHoliday, isHolidayEvening} = require('../managers/HolidayAnalyzer');

describe('"HolidayAnalyzer', function () {
    it('Yom Kipur evening should be evening holiday', function() {
        expect(isListedHoliday("2017-09-29", EDayType.HolidayEvening)).to.be.true;
        expect(isHolidayEvening("2017-09-29")).to.be.true;
        expect(isHoliday("2017-09-29")).to.be.false;

    });
    it('Yom Kipur should be holiday', function() {
        expect(isListedHoliday("2017-09-30", EDayType.Holiday)).to.be.true;
        expect(isHolidayEvening("2017-09-30")).to.be.false;
        expect(isHoliday("2017-09-30")).to.be.true;
    });
    it('Friday should be evening holiday', function() {
        expect(isListedHoliday("2017-11-24", EDayType.HolidayEvening)).to.be.false;
        expect(isHolidayEvening("2017-11-24")).to.be.true;
        expect(isHoliday("2017-11-24")).to.be.false;
    });
    it('Saturday should be holiday', function() {
        expect(isListedHoliday("2017-11-25", EDayType.Holiday)).to.be.false;
        expect(isHolidayEvening("2017-11-25")).to.be.false;
        expect(isHoliday("2017-11-25")).to.be.true;
    });
    it('Monday should be regular date', EDayType.HolidayEvening, function() {
        expect(isListedHoliday("2017-11-20")).to.be.false;
        expect(isHolidayEvening("2017-11-20")).to.be.false;
        expect(isHoliday("2017-11-20")).to.be.false;
    });
});
