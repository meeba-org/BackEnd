import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {Feature} from "../../../managers/FeaturesManager";
import {showCancelPremiumModal, showGoPremiumModal} from "../../actions";
import {updateCompany} from "../../actions/companyActions";
import {updateActiveUser} from "../../actions/usersActions";
import * as selectors from "../../selectors";
import User from "./User";

class UserContainer extends React.Component {

    render() {
        const {handleSubmit, updateUser, updateCompany, isCommuteFeatureEnable, plan, showGoPremiumModal, showCancelPremiumModal} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {})}>
                <Field
                    component={User}
                    name="user"
                    onUpdateUser={updateUser}
                    onUpdateCompany={updateCompany}
                    isCommuteFeatureEnable={isCommuteFeatureEnable}
                    plan={1}
                    onFreePlanClick={showGoPremiumModal}
                    onPremiumPlanClick={showCancelPremiumModal}
                />
            </form>
        );
    }
}

UserContainer.propTypes = {
    updateUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    plan: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        // user: state.user,
        initialValues: {
            user: state.user
        },
        isCommuteFeatureEnable: selectors.isFeatureEnable(state, Feature.CommuteModule),
        plan: selectors.getPlan(state)
    };
}

const mapDispatchToProps = {
    updateUser: (user) => updateActiveUser(user),
    updateCompany: (user) => updateCompany(user),
    showGoPremiumModal: () => showGoPremiumModal(),
    showCancelPremiumModal: () => showCancelPremiumModal()
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(UserContainer));

