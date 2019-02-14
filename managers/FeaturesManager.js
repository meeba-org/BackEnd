const Feature = {
    CommuteModule : "CommuteModule",
    Premium: "Premium",
    Tasks: "Tasks"
};

const GlobalFeatures = [Feature.CommuteModule];
const PremiumFeatures = [Feature.CommuteModule];

const hasFeature = (company, feature) => {
    return company.features.includes(feature);
};
const isCompanyHasPremium = (company) => {
    return hasFeature(company, Feature.Premium);
};

function isFeatureGloballyEnable(feature) {
    return GlobalFeatures.includes(feature);
}

const isFeatureEnable = (company, feature) => {
    if (isFeatureGloballyEnable(feature))
        return true;

    if (isCompanyHasPremium(company))
        return PremiumFeatures.contains(feature);

    return hasFeature(company, feature);
};

module.exports = {
    Feature,
    isFeatureEnable
};
