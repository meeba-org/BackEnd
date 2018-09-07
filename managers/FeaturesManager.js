const isFeatureEnable = (company, featureId) => {
    return company.features.contain(featureId);
};

module.exports = {
    isFeatureEnable
}
