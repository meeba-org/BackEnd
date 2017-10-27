import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadUserFromToken} from "../../actions/index";
import {Field, reduxForm} from "redux-form";
import User from "./User";
import {updateUser} from "../../actions/userActions";

class UserContainer extends React.Component {
    render() {
        const {handleSubmit, updateUser} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {})}>
                <Field
                    component={User}
                    name="user"
                    onUpdate={updateUser}
                />
            </form>
        );
    }
}

UserContainer.propTypes = {
    updateUser: PropTypes.func.isRequired,
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
        loadUserFromToken: () => {dispatch(loadUserFromToken());},
        updateUser: (user) => {dispatch(updateUser(user));},
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'userForm',
    enableReinitialize: true,
})(UserContainer));

