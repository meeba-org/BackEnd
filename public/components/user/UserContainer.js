import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {Feature} from "../../../managers/FeaturesManager";
import {showCancelPremiumModal, showGoPremiumModal} from "../../actions";
import {updateCompany} from "../../actions/companyActions";
import {updateActiveUser} from "../../actions/usersActions";
import * as selectors from "../../selectors";
import {getUser} from "../../selectors";
import User from "./User";

class UserContainer extends React.Component {

    render() {
        const {updateUser, updateCompany, isCommuteFeatureEnable, hasPremiumFeature, showGoPremiumModal, showCancelPremiumModal, user} = this.props;

        return (
            <User
                user={user}
                onUpdateUser={updateUser}
                onUpdateCompany={updateCompany}
                isCommuteFeatureEnable={isCommuteFeatureEnable}
                hasPremiumFeature={hasPremiumFeature}
                onFreePlanClick={showGoPremiumModal}
                onPremiumPlanClick={() => showCancelPremiumModal(user.company)}
            />
        );
    }
}

UserContainer.propTypes = {
    updateUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    hasPremiumFeature: PropTypes.bool,
};

const mapStateToProps = state => ({
    user: getUser(state),
    isCommuteFeatureEnable: selectors.isFeatureEnable(state, Feature.CommuteModule),
    hasPremiumFeature: selectors.hasPremiumFeature(state)
});

const mapDispatchToProps = {
    updateUser: (user) => updateActiveUser(user),
    updateCompany: (user) => updateCompany(user),
    showGoPremiumModal: () => showGoPremiumModal(),
    showCancelPremiumModal: (company) => showCancelPremiumModal(company)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(UserContainer));

