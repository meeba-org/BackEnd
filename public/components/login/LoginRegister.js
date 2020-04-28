/**
 * Created by Chen on 16/07/2017.
 */

import {CircularProgress, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, {useState} from 'react';
import "../../styles/LoginRegister.scss";

const LoginRegister = ({
                           isLoginMode, isLoading, open, error, handleClose,
                           handleChange, handleSubmit, toggleLoginMode
                       }) => {
    let buttonText = isLoginMode ? "היכנס" : "הירשם";
    let footerTextQuestion = isLoginMode ? "עדיין לא נרשמת?" : "נרשמת כבר?";
    let changeModeText = isLoginMode ? "הירשם כעת" : "היכנס עכשיו";

    const [showPassword, setShowPassword] = useState(false);

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSubmit();
            event.preventDefault();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div styleName="login-register">
                <DialogTitle>ברוך הבא!</DialogTitle>
                <DialogContent>
                    <TextField
                        label="שם משתמש"
                        placeholder="שם משתמש"
                        name={isLoginMode ? "uid" : "username"}
                        autoComplete="username"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        fullWidth
                        autoFocus
                        inputProps={{"data-hj-whitelist": ""}}
                    />
                    <TextField
                        label="סיסמא"
                        placeholder="סיסמא"
                        type={showPassword ? "text" : "password"}
                        value={"123456"}
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        fullWidth
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end" styleName="password-icon">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>

                        }}
                    />
                    {!isLoginMode &&
                    <TextField
                        label="אימות סיסמא"
                        placeholder="אימות סיסמא"
                        type={showPassword ? "text" : "password"}
                        name="retypePassword"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        autoComplete="current-password"
                        value={"123456"} // TODO remove that!
                        fullWidth
                    />
                    }
                    {error && <Typography styleName="error-msg">{error}</Typography>}
                    <div styleName="login-register-footer">
                        <Button variant="contained" color="primary" type="submit" styleName="login-button"
                                onClick={handleSubmit}>
                            <Typography styleName="button-text">{buttonText}</Typography>
                            {isLoading ? <CircularProgress size={15} style={{color: "white"}}/> : <ArrowBackIcon/>}
                        </Button>
                        <div styleName="footer-text">
                            <Typography styleName="question">{footerTextQuestion}</Typography>
                            <Typography styleName="change-mode" onClick={toggleLoginMode}>{changeModeText}</Typography>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default LoginRegister;
