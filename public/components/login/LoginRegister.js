/**
 * Created by Chen on 16/07/2017.
 */

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import CSSModules from "react-css-modules";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Form} from "redux-form";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {handleLogin, hideLoginRegisterModal} from "../../actions";
import styles from "../../styles/LoginRegister.scss";
import {renderTextField} from '../material-ui-wrappers';

class LoginRegister extends Component {

    state = {
        isLoginMode: true
    };

    toggleLoginMode= () => {
        this.setState({isLoginMode: !this.state.isLoginMode});
        this.props.change('isLoginMode', !this.state.isLoginMode);
    };

    handleClose = () => {
        this.props.hideLoginRegisterModal();
    };

    handleSubmit = (values) => {
        let {history, handleLogin} = this.props;

        handleLogin(values, history);
    };

    render() {
        let {handleSubmit, handleChange, error, open} = this.props;
        let {isLoginMode} = this.state;

        let buttonText = isLoginMode ? "היכנס" : "הירשם";
        let footerTextQuestion = isLoginMode ? "עדיין לא נרשמת?" : "נרשמת כבר?";
        let changeModeText = isLoginMode ? "הירשם כעת" : "היכנס עכשיו";

        return (
            <Dialog open={open} onClose={this.handleClose}>
                <div className={styles["login-register"]}>
                        <div className={styles["title"]}>
                            <div className={styles["title-text"]}>
                            ברוך הבא!
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit(this.handleSubmit)}>
                                <Field
                                       fullWidth={true}
                                       component={renderTextField}
                                       onChange={handleChange}
                                       label="שם משתמש"
                                       name={isLoginMode ? "uid" : "username"}
                                       autoComplete="username"
                                       autoFocus
                                />
                                <Field component={renderTextField}
                                       fullWidth={true}
                                       onChange={handleChange}
                                       label="סיסמא"
                                       type="password"
                                       name="password"
                                       autoComplete="current-password"
                                />
                            {!isLoginMode &&
                                <Field component={renderTextField}
                                       fullWidth={true}
                                       onChange={handleChange}
                                       label="אימות סיסמא"
                                       type="password"
                                       name="retypePassword"
                                />
                            }
                            {error && <div className={styles["error-msg"]}>{error}</div>}
                            <div className={styles["login-register-footer"]}>
                                <Button variant="contained" color="primary" type="submit" className={styles["login-button"]}>
                                    <span>{buttonText}</span>
                                    <ArrowBackIcon/>
                                </Button>
                                <div className={styles["footer-text"]}>
                                    <div className={styles["question"]}>{footerTextQuestion}</div>
                                    <div className={styles["change-mode"]} onClick={this.toggleLoginMode}>{changeModeText}</div>
                                </div>
                            </div>
                        </Form>
                </div>
            </Dialog>
        );
    }
}

LoginRegister.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func,
    error: PropTypes.string,
    change: PropTypes.func,
};

const mapStateToProps = state => ({
    initialValues: {isLoginMode: true} // pull initial values from account reducer
});

const mapDispatchToProps = {
    hideLoginRegisterModal,
    handleLogin
};

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'loginRegisterForm' // a unique identifier for this form
})(CSSModules(withRouter(LoginRegister), styles)));

