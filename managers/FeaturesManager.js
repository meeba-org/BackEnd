const Feature = {
    CommuteModule : "CommuteModule",
    Premium: "Premium",
    Tasks: "Tasks"
};

const GlobalFeatures = [Feature.CommuteModule, Feature.Tasks];
const PremiumFeatures = [Feature.Premium, Feature.CommuteModule];

const hasFeature = (company, feature) => {
    return company.features.includes(feature);
};
const isCompanyHasPremium = (company) => {
    return hasFeature(company, Feature.Premium);
};

const isFeatureGloballyEnable = feature => GlobalFeatures.includes(feature);

const addFeature = (company, feature) => {
    if (!company.features)
        company.features = [];

    if (!company.features.includes(feature))
        company.features.push(feature);
};

const removeFeature = (features, feature) => {
    if (!features)
        return features;

    if (features.includes(feature)) {
        return features.filter(f => f !== feature);
    }

    return features;
};

const isFeatureEnable = (company, feature) => {
    if (isFeatureGloballyEnable(feature))
        return true;

    if (isCompanyHasPremium(company))
        return PremiumFeatures.includes(feature);

    return hasFeature(company, feature);
};

module.exports = {
    Feature,
    isFeatureEnable,
    addFeature,
    isCompanyHasPremium,
    removeFeature
};
