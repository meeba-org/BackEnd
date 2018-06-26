/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {renderTextField} from '../material-ui-wrappers';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../../styles/Login.scss";

class Login extends Component {
    render() {
        let {handleSubmit, handleChange, error} = this.props;
        return (
            <div styleName="login">
                <h1 styleName="title">מיבא</h1>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>
                            <Divider/>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Grid item xs={12}>
                                        <Field component={renderTextField} onChange={handleChange}
                                               label="תעודת זהות" name="uid"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field component={renderTextField}
                                               onChange={handleChange}
                                               label="סיסמא"
                                               type="password"
                                               name="password"
                                        />
                                    </Grid>
                                    {error && <div styleName="error-msg">{error}</div>}
                                    <Button variant="raised" color="primary" type="submit" styleName="submit-button"><ArrowBackIcon/>היכנס</Button>
                                </form>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <h5 styleName="sub-title">נוצר ע"י <a target="_blank" href="https://www.linkedin.com/in/chenop/">חן אופנהיים</a></h5>
            </div>
        );
    }
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func,
    error: PropTypes.string,
};
Login.defaultProps = {};

export default connect(
    // mapStateToProps
)(reduxForm({
    form: 'loginForm',
})(CSSModules(Login, styles)));


