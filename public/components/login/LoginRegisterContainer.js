/**
 * Created by Chen on 16/07/2017.
 */

import React, {useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {handleLogin, handleRegister, hideLoginRegisterModal} from "../../actions";
import "../../styles/LoginRegister.scss";
import LoginRegister from "./LoginRegister";

const LoginRegisterContainer = ({open, hideLoginRegisterModal, handleLogin, handleRegister, history}) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState("");
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
                password: "123456" // TODO remove passwd
            },
            () => {
                setIsLoading(false);
                handleClose();
                history.push("/dashboard");
            },
            (err) => {
                setIsLoading(false);
                // TODO Error handling by err.code auth/email-already-in-use
                setError(err.message);
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
                // TODO Error handling by err.code auth/email-already-in-use
                setError(err.message);
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

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setValues({
            ...values,
            [name]: value,
        });
        setError("");
    };
    
    return (
        <LoginRegister
            isLoginMode={isLoginMode}
            isLoading={isLoading}
            open={open}
            error={error}
            handleChange={handleChange}
            handleSubmit={onSubmit}
            handleClose={handleClose}
            toggleLoginMode={toggleLoginMode}
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

