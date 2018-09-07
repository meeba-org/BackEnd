const FeatureName = {
    CommuteModule : "CommuteModule",
}

const isFeatureEnable = (company, featureName) => {
    return company.features.contain(featureName);
};

module.exports = {
    FeatureName,
    isFeatureEnable
}
