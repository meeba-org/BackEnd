const mongoose = require('mongoose');

// Group Schema
const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Company = module.exports = mongoose.model('Company', CompanySchema);

function createCompanyInstance(company) {
    let newCompany = new Company();
    Object.assign(newCompany, company);
    return newCompany;
}

module.exports.getAllCompanies = () => {
    return Company.find().exec();
};

module.exports.getByCompanyId = (id) => {
    return Company.findById(id).exec();
};

module.exports.createCompany = (company) => {
    let newCompany = createCompanyInstance(company);

    return newCompany.save();
};

module.exports.updateCompany = (company) => {
    let newCompany = createCompanyInstance(company);
    newCompany._id = company._id;

    newCompany = newCompany.toObject();
    return Company.findOneAndUpdate({'_id': newCompany._id}, newCompany, {upsert: true, new: true}).exec();
};

module.exports.deleteCompany = (id) => {
    return Company.remove({_id: id}).exec();
 };

 module.exports.addUser = (companyId, user) => {
     return Company.findByIdAndUpdate(companyId, {$push: {"users": user.toObject()}}, {new : true});
};

module.exports.removeUser = (companyId, user) => {
    return Company.findByIdAndUpdate(companyId,
        // { name: 'Shula' },
        { $pull: { users: {'_id': user.id}} },
        {'new': true}
        );
};

module.exports.deleteAllCompanies = (conditions) => {
    if (!conditions)
        conditions = {};
    Company.remove(conditions).exec();
}
