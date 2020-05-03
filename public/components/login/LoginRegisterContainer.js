/**
 * Created by Chen on 16/07/2017.
 */

import React, {useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {isEmptyObject, isValidEmail} from "../../../managers/utils";
import {handleLogin, handleRegister, hideLoginRegisterModal} from "../../actions";
import "../../styles/LoginRegister.scss";
import LoginRegister from "./LoginRegister";

const LoginRegisterContainer = ({open, hideLoginRegisterModal, handleLogin, handleRegister, history}) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [backEndError, setBackEndError] = useState("");
    const [dirty, setDirty] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({});
    
    const toggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const handleClose = () => {
        hideLoginRegisterModal();
    };

    const onRegister = values => {
        return handleRegister(
            // values, 
            {
                username: values.username,
                email: values.email,
                password: values.password
            },
            () => {
                setIsLoading(false);
                handleClose();
                history.push("/dashboard");
            },
            (err) => {
                setIsLoading(false);
                setBackEndError(err.message);
            }
        );
    };

    const onLogin = values => {
        return handleLogin(
            {
                identifier: values.identifier,
                password: values.password
            },
            () => {
                setIsLoading(false);
                handleClose();
                history.push("/dashboard");
            },
            (err) => {
                setIsLoading(false);
                setBackEndError(err.message);
            }
        );
    };
    
    const onSubmit = () => {
        setIsLoading(true);

        if (isLoginMode)
            onLogin(values);
        else 
            onRegister(values);
    };

    const calcRegisterErrors = errors => {
        const {username, email, password, retypePassword} = values;

        if (dirty.username && !username)
            errors = {username: "שם משתמש חסר"};
        else if (dirty.email && !email)
            errors = {email: "אימייל חסר"};
        else if (dirty.email && !isValidEmail(email))
            errors = {email: "אימייל לא תקין"};
        else if (dirty.password && !password)
            errors = {password: "סיסמא חסרה"};
        else if (dirty.password && password.length < 6)
            errors = {password: "אורך סיסמא לפחות 6 תוים"};
        else if (dirty.retypePassword && !retypePassword)
            errors = {retypePassword: "סיסמא חסרה"};
        else if (password !== retypePassword)
            errors = {password: "סיסמא לא זהה", retypePassword: "סיסמא לא זהה"};
        return errors;
    };

    const calcLoginErrors = errors => {
        const {identifier, password} = values;

        if (dirty.identifier && !identifier)
            errors = {identifier: "שם משתמש או אימייל חסר"};
        else if (dirty.password && !password)
            errors = {password: "סיסמא חסרה"};
        return errors;
    };

    const calcErrors = () => {
        let errors = {};
        if (!isLoginMode) {
            errors = calcRegisterErrors(errors);
        }
        else {
            errors = calcLoginErrors(errors);
        }
        return errors;
    };
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setValues({
            ...values,
            [name]: value,
        });
        setDirty({
            ...dirty,
            [name]: true
        });
        setBackEndError("");
    };
    
    const shouldEnableSubmit = () => {
        if (!isLoginMode)
            return isEmptyObject(errors) && Object.keys(dirty).length === 4;
        else
            return isEmptyObject(errors) && Object.keys(dirty).length === 2;
    };

    const errors = calcErrors();

    return (
        <LoginRegister
            isLoginMode={isLoginMode}
            isLoading={isLoading}
            open={open}
            errors={errors}
            backEndError={backEndError}
            handleChange={handleChange}
            handleSubmit={onSubmit}
            handleClose={handleClose}
            toggleLoginMode={toggleLoginMode}
            isSubmitDisabled={!shouldEnableSubmit()}
        />
    );
};

LoginRegisterContainer.propTypes = {
};

const mapDispatchToProps = {
    hideLoginRegisterModal,
    handleLogin,
    handleRegister
};

export default connect(null, mapDispatchToProps)(withRouter(LoginRegisterContainer));

