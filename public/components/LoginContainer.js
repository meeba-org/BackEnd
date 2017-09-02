import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Login from "./Login";
import {handleLogin} from "../actions/actions";
import PropTypes from 'prop-types';

let LoginContainer = ({ handleLoginSubmit }) =>
    <Login onSubmit={values => handleLoginSubmit(values)} />;

const mapDispatchToProps = (dispatch) => ({
    handleLoginSubmit: value => dispatch(handleLogin(value)),
});

LoginContainer.propTypes = {
    handleLoginSubmit: PropTypes.func.isRequired
};
export default reduxForm({ form: 'LoginContainer' })(connect(null, mapDispatchToProps)(LoginContainer));
