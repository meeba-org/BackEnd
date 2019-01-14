const Feature = {
    CommuteModule : "CommuteModule",
    Premium: "Premium",
    Tasks: "Tasks"
};

const PremiumFeatures = [Feature.CommuteModule];

const hasFeature = (company, feature) => {
    return company.features.includes(feature);
};
const isCompanyHasPremium = (company) => {
    return hasFeature(company, Feature.Premium);
};

const isFeatureEnable = (company, feature) => {
    if (isCompanyHasPremium(company))
        return PremiumFeatures.contains(feature);

    return hasFeature(company, feature);
};

module.exports = {
    Feature: Feature,
    isFeatureEnable
};
