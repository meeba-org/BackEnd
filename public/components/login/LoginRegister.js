/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";

import {connect} from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {renderTextField} from '../material-ui-wrappers';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../../styles/LoginRegister.scss";
import {hideLoginRegisterModal} from "../../actions";

class LoginRegister extends Component {

    state = {
        isLoginMode: true
    };

    toggleLoginMode= () => {
        this.setState({isLoginMode: !this.state.isLoginMode});
        this.props.change('isLoginMode', !this.state.isLoginMode);
    }

    handleClose = () => {
        let {dispatch} = this.props;

        dispatch(hideLoginRegisterModal())
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
                        <form onSubmit={handleSubmit}>
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
                                <Button variant="raised" color="primary" type="submit" className={styles["login-button"]}>
                                    <span>{buttonText}</span>
                                    <ArrowBackIcon/>
                                </Button>
                                <div className={styles["footer-text"]}>
                                    <div className={styles["question"]}>{footerTextQuestion}</div>
                                    <div className={styles["change-mode"]} onClick={this.toggleLoginMode}>{changeModeText}</div>
                                </div>
                            </div>
                        </form>
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
LoginRegister.defaultProps = {};

export default connect(
    // mapStateToProps
)(reduxForm({
    form: 'loginRegisterForm',
    fields: ['isLoginMode'],
    initialValues: {
        isLoginMode: true
    }
})(CSSModules(LoginRegister, styles)));


