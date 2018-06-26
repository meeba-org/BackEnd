import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import User from "./User";
import {updateActiveUser} from "../../actions/usersActions";
import {updateCompany} from "../../actions/companyActions";

class UserContainer extends React.Component {

    render() {
        const {handleSubmit, updateUser, updateCompany} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {})}>
                <Field
                    component={User}
                    name="user"
                    onUpdateUser={updateUser}
                    onUpdateCompany={updateCompany}
                />
            </form>
        );
    }
}

UserContainer.propTypes = {
    updateUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        initialValues: {
            user: state.user
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (user) => {dispatch(updateActiveUser(user));},
        updateCompany: (user) => {dispatch(updateCompany(user));},
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(UserContainer));

