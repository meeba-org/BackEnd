/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import {Button, Divider, Grid, Paper, TextField} from "material-ui";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

class Login extends Component {
    render() {
        let {handleSubmit} = this.props;
        return (
            <div>
                <Grid container gutter={0}>
                    <Grid item xs={12}>
                        <Paper id="main-container">
                            <h1>Login Window</h1>
                            <Divider />
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Grid item xs={12}>
                                        <Field component={TextField} label="שם משתמש או אימייל" name="username" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field component={TextField} label="סיסמא" type="password" name="password" />
                                    </Grid>
                                    <Button dense raised color="primary" onClick={() => handleSubmit}><ArrowBackIcon />היכנס</Button>
                                </form>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    handleSubmit: PropTypes.func
};
Login.defaultProps = {};

export default connect(
)(reduxForm({
    form: 'loginForm',
})(Login));


