const mongoose = require('mongoose');

// Group Schema
const FeatureSchema = mongoose.Schema({
    name: {type: String}
});

const Feature = mongoose.model('Feature', FeatureSchema);

module.exports = {

}
