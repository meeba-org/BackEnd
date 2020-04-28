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
    const [isLoginMode, setIsLoginMode] = useState(false); // TODO should be true!
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({});
    
    const toggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const handleClose = () => {
        hideLoginRegisterModal();
    };

    const handleSubmit = () => {
        setIsLoading(true);

        handleRegister({
                email: values.username,
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
                setError(err.toString());
            }
        );
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
            handleSubmit={handleSubmit}
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

