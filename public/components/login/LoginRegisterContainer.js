import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleLogin} from "../../actions/index";
import PropTypes from 'prop-types';
import LoginRegister from "./LoginRegister";

class LoginRegisterContainer extends Component {
    render() {
        let { handleLoginSubmit, router, onCancel, visible } = this.props;

        return (
            <LoginRegister onSubmit={values => handleLoginSubmit(values, router)} onCancel={onCancel} open={visible}/>
        );
    }
}

LoginRegisterContainer.propTypes = {
    handleLoginSubmit: PropTypes.func.isRequired,
    router: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSubmit: (value, router) => dispatch(handleLogin(value, router)),
});

export default connect(null, mapDispatchToProps)(LoginRegisterContainer);
