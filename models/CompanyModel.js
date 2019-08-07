const mongoose = require('mongoose');
const EPlanType = require('./EPlanType');

// Group Schema
const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true,
        default: "החברה שלי"
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    settings: {
        eveningHolidayStartHour: {type: Number, default: 18}, // start hour of evening holiday (i.e. Friday knisat shabat hour)
        holidayEndHour: {type: Number, default: 19}, // end hour of holiday (i.e. Saturday Yetziat shabat hour)
        holidayShiftLength: {type: Number, default: 9},
        enableCommute: {type: Boolean, default: false},
        enableTasks: {type: Boolean, default: false},
        breakLength: {type: Number, default: 0},
    },
    features: [String],
    plan: {type: Number, default: EPlanType.Free},
    creditCardToken: {type: String}
});

const Company = mongoose.model('Company', CompanySchema);

function createCompanyInstance(company) {
    let newCompany = new Company();
    Object.assign(newCompany, company);
    return newCompany;
}

const getAllCompanies = () => {
    return Company.find().exec();
};

const getByCompanyId = (id) => {
    return Company.findById(id).populate('users').exec();
};

const createCompany = (company) => {
    let newCompany = createCompanyInstance(company);

    return newCompany.save();
};

const updateCompany = (company) => {
    let newCompany = createCompanyInstance(company);
    newCompany._id = company._id;

    newCompany = newCompany.toObject();
    return Company.findOneAndUpdate({'_id': newCompany._id}, newCompany, {upsert: true, new: true}).exec();
};

const deleteCompany = (id) => {
    return Company.remove({_id: id}).exec();
 };

 const addUser = (companyId, user) => {
     return Company.findByIdAndUpdate(companyId, {$push: {"users": user.toObject()}}, {new : true});
};

const removeUser = (companyId, user) => {
    return Company.findByIdAndUpdate(companyId, { $pull: { "users": user.id} }, {'new': true} );
};

const deleteAllCompanies = (conditions) => {
    if (!conditions)
        conditions = {};
    return Company.remove(conditions).exec();
};

const companiesCount = () => Company.countDocuments().exec();

module.exports = {
    createCompany
    , getByCompanyId
    , getAllCompanies
    , updateCompany
    , deleteCompany
    , deleteAllCompanies
    , addUser
    , removeUser
    , companiesCount
};
