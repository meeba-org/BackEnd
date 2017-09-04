/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import {Button, Divider, Grid, Paper} from "material-ui";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import {renderTextField} from '../material-ui-wrappers';
import PropTypes from 'prop-types';

class Login extends Component {
    render() {
        let {handleSubmit, handleChange} = this.props;
        return (
            <div>
                <Grid container gutter={0}>
                    <Grid item xs={12}>
                        <Paper id="main-container">
                            <h1>Login Window</h1>
                            <Divider/>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Grid item xs={12}>
                                        <Field component={renderTextField} onChange={handleChange}
                                               label="שם משתמש או אימייל" name="uid"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field component={renderTextField} onChange={handleChange}
                                               label="סיסמא"
                                               type="password" name="password"/>
                                    </Grid>
                                    <Button dense raised color="primary" type="submit"><ArrowBackIcon/>היכנס</Button>
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
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func,
};
Login.defaultProps = {};

export default connect(
    // mapStateToProps
)(reduxForm({
    form: 'loginForm',
})(Login));


