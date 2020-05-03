/**
 * Created by Chen on 16/07/2017.
 */

import {CircularProgress, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, {useState} from 'react';
import "../../styles/LoginRegister.scss";

const RegisterDialogContent = ({isLoading, errors, backEndError, handleChange, handleSubmit, toggleLoginMode, isSubmitDisabled, handleKeyPress}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <TextField
                label={"שם משתמש"}
                placeholder={"שם משתמש"}
                name="username"
                autoComplete="username"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                fullWidth
                autoFocus
                error={errors["username"]}
                helperText={errors["username"]}
                inputProps={{"data-hj-whitelist": ""}}
            />
            <TextField
                label={"אימייל"}
                placeholder={"אימייל"}
                type={"email"}
                name="email"
                autoComplete="email"
                error={errors["email"]}
                helperText={errors["email"]}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                fullWidth
                inputProps={{"data-hj-whitelist": ""}}
            />
            <TextField
                label="סיסמא"
                placeholder="סיסמא"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={errors["password"]}
                helperText={errors["password"]}
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
            <TextField
                label="אימות סיסמא"
                placeholder="אימות סיסמא"
                type={showPassword ? "text" : "password"}
                name="retypePassword"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoComplete="new-password"
                error={errors["retypePassword"]}
                helperText={errors["retypePassword"]}
                fullWidth
            />
            {backEndError && <Typography styleName="error-msg">{backEndError}</Typography>}
            <div styleName="login-register-footer">
                <Button variant="contained" color="primary" type="submit" styleName="login-button"
                        disabled={isSubmitDisabled}
                        onClick={handleSubmit}>
                    <Typography styleName="button-text">הירשם</Typography>
                    {isLoading ? <CircularProgress size={15} style={{color: "white"}}/> : <ArrowBackIcon/>}
                </Button>
                <div styleName="footer-text">
                    <Typography styleName="question">נרשמת כבר?</Typography>
                    <Typography styleName="change-mode" onClick={toggleLoginMode}>היכנס עכשיו</Typography>
                </div>
            </div>
        </>
    );
};

export default RegisterDialogContent;
