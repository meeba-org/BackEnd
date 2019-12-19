const getCompanySettings = company => company.settings;

const isAbsenceDaysEnable = company => getCompanySettings(company).enableAbsenceDays;

module.exports = {
    isAbsenceDaysEnable
};
