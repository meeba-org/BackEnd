const FeatureName = {
    CommuteModule : "CommuteModule",
}

const isFeatureEnable = (company, featureName) => {
    return company.features.includes(featureName);
};

module.exports = {
    FeatureName,
    isFeatureEnable
}
