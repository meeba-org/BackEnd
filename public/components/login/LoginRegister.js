/**
 * Created by Chen on 16/07/2017.
 */

import {DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {handleLogin, hideLoginRegisterModal} from "../../actions";
import "../../styles/LoginRegister.scss";

class LoginRegister extends Component {

    state = {
        isLoginMode: true,
        error: ""
    };

    toggleLoginMode= () => {
        this.setState({isLoginMode: !this.state.isLoginMode});
    };

    handleClose = () => {
        this.props.hideLoginRegisterModal();
    };

    handleSubmit = () => {
        let {history, handleLogin} = this.props;
        let {values, isLoginMode} = this.state;

        handleLogin(values, isLoginMode, history, (error) => this.setState({error}));
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        const {values} = this.state;
        this.setState({
            values: {
                ...values,
                [name]: value,
            },
            error: ""
        });
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.handleSubmit();
            event.preventDefault();
        }
    };


    render() {
        let {open} = this.props;
        const {error} = this.state;
        let {isLoginMode} = this.state;

        let buttonText = isLoginMode ? "היכנס" : "הירשם";
        let footerTextQuestion = isLoginMode ? "עדיין לא נרשמת?" : "נרשמת כבר?";
        let changeModeText = isLoginMode ? "הירשם כעת" : "היכנס עכשיו";

        return (
            <Dialog open={open} onClose={this.handleClose}>
                <div styleName="login-register">
                    <DialogTitle>ברוך הבא!</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="שם משתמש"
                            placeholder="שם משתמש"
                            name={isLoginMode ? "uid" : "username"}
                            autoComplete="username"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            label="סיסמא"
                            placeholder="סיסמא"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            fullWidth
                        />
                        {!isLoginMode &&
                        <TextField
                            label="אימות סיסמא"
                            placeholder="אימות סיסמא"
                            type="password"
                            name="retypePassword"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            autoComplete="current-password"
                            fullWidth
                        />
                        }
                        {error && <Typography styleName="error-msg">{error}</Typography>}
                        <div styleName="login-register-footer">
                            <Button variant="contained" color="primary" type="submit" styleName="login-button" onClick={this.handleSubmit}>
                                <Typography>{buttonText}</Typography>
                                <ArrowBackIcon/>
                            </Button>
                            <div styleName="footer-text">
                                <Typography styleName="question">{footerTextQuestion}</Typography>
                                <Typography styleName="change-mode" onClick={this.toggleLoginMode}>{changeModeText}</Typography>
                            </div>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        );
    }
}

LoginRegister.propTypes = {
};

const mapDispatchToProps = {
    hideLoginRegisterModal,
    handleLogin
};

export default connect(null, mapDispatchToProps)(withRouter(LoginRegister));

