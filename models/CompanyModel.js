const mongoose = require('mongoose');

// Group Schema
const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    users: [{ type: ObjectId, ref: 'User' }]
});

const Company = module.exports = mongoose.model('Company', CompanySchema);

function createCompanyInstance(company) {
    let newCompany = new Company();
    newCompany.name = company.uid;
    newCompany.users = [];
    return newCompany;
}

module.exports.getById = (id) => {
    return Company.find({_id: id});
};

module.exports.create = (company) => {
    let newCompany = createCompanyInstance(company);

    return newCompany.save();
};

module.exports.update = (company) => {
    let newCompany = createCompanyInstance(company);
    newCompany._id = company._id;

    newCompany = newCompany.toObject();
    return Company.findOneAndUpdate({'_id': newCompany._id}, newCompany, {upsert: true, new: true}).exec();
};

module.exports.delCompany = (id) => {
    return Company.remove({_id: id}).exec();
};

module.exports.addUser = (companyId, user) => {
    return Company.getById(companyId)
        .then((company) => company.users.push(user));
};

module.exports.removeUser = (companyId, user) => {
    return Company.update( { _id: companyId }, { $pull: { users: {_id: user._id} } } );
};
