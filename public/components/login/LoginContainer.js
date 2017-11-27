import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Login from "./Login";
import {handleLogin} from "../../actions/index";
import PropTypes from 'prop-types';

class LoginContainer extends Component {
    render() {
        let { handleLoginSubmit, router } = this.props;

        return (
            <Login onSubmit={values => handleLoginSubmit(values, router)}/>
        );
    }
}

LoginContainer.propTypes = {
    handleLoginSubmit: PropTypes.func.isRequired,
    router: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSubmit: (value, router) => dispatch(handleLogin(value, router)),
});

export default reduxForm({ form: 'LoginContainer' })(connect(null, mapDispatchToProps)(LoginContainer));
