import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Login from "./Login";
import {handleLogin} from "../../actions/index";
import PropTypes from 'prop-types';

let LoginContainer = ({ handleLoginSubmit, router }) =>
    <Login onSubmit={values => handleLoginSubmit(values, router)} />;

const mapDispatchToProps = (dispatch) => ({
    handleLoginSubmit: (value, router) => dispatch(handleLogin(value, router)),
});

LoginContainer.propTypes = {
    handleLoginSubmit: PropTypes.func.isRequired,
    router: PropTypes.object
};
export default reduxForm({ form: 'LoginContainer' })(connect(null, mapDispatchToProps)(LoginContainer));
