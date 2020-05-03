/**
 * Created by Chen on 16/07/2017.
 */

import {DialogContent, DialogTitle} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React from 'react';
import "../../styles/LoginRegister.scss";
import LoginDialogContent from "./LoginDialogContent";
import RegisterDialogContent from "./RegisterDialogContent";

const LoginRegister = ({
                           isLoginMode, isLoading, open, errors, backEndError, handleClose,
                           handleChange, handleSubmit, toggleLoginMode, isSubmitDisabled
                       }) => {
    const handleKeyPress = event => {
        if (event.key === 'Enter' && !isSubmitDisabled) {
            handleSubmit();
            event.preventDefault();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div styleName="login-register">
                <DialogTitle>ברוך הבא!</DialogTitle>
                <DialogContent>
                    {isLoginMode && 
                    <LoginDialogContent
                        isLoading={isLoading}
                        errors={errors}
                        backEndError={backEndError}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        toggleLoginMode={toggleLoginMode}
                        isSubmitDisabled={isSubmitDisabled}
                        handleKeyPress={handleKeyPress}
                    />
                    }
                    {!isLoginMode &&
                    <RegisterDialogContent
                        isLoading={isLoading}
                        errors={errors}
                        backEndError={backEndError}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        toggleLoginMode={toggleLoginMode}
                        isSubmitDisabled={isSubmitDisabled}
                        handleKeyPress={handleKeyPress}
                    />
                    }
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default LoginRegister;
