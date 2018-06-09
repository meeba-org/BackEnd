/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import {Button, Dialog} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {renderTextField} from '../material-ui-wrappers';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../../styles/LoginRegister.scss";

class LoginRegister extends Component {

    state = {
        isLoginMode: true
    };

    toggleLoginMode= () => {
        this.setState({isLoginMode: !this.state.isLoginMode});
        this.props.change('isLoginMode', !this.state.isLoginMode);
    }

    render() {
        let {handleSubmit, handleChange, error, onCancel, visible} = this.props;
        let {isLoginMode} = this.state;

        let buttonText = isLoginMode ? "היכנס" : "הירשם";
        let footerTextQuestion = isLoginMode ? "עדיין לא נרשמת?" : "נרשמת כבר?";
        let changeModeText = isLoginMode ? "הירשם כעת" : "היכנס עכשיו";

        return (
            <Dialog open={visible} onClose={onCancel}>
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
                                       autoFocus
                                />
                                <Field component={renderTextField}
                                       fullWidth={true}
                                       onChange={handleChange}
                                       label="סיסמא"
                                       type="password"
                                       name="password"
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
                            <div styleName="login-register-footer">
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
    onCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
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


