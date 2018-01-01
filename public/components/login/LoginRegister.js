/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import {Button, Dialog, DialogContent} from "material-ui";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import {renderTextField} from '../material-ui-wrappers';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../../styles/LoginRegister.scss";

class LoginRegister extends Component {


    render() {
        let {handleSubmit, handleChange, error, onCancel, visible} = this.props;
        return (
            <Dialog open={visible} onClose={onCancel}>
                <div id="login-register">
                    <DialogContent>
                        <div id="title">
                            ברוך הבא!
                        </div>
                        <hr/>
                        <form onSubmit={handleSubmit}>
                            <div >
                                <Field fullWidth={true} component={renderTextField} onChange={handleChange}
                                       label="תעודת זהות" name="uid" autoFocus={true} />
                            </div>
                            <div className="field">
                                <Field component={renderTextField}
                                       fullWidth={true}
                                       onChange={handleChange}
                                       label="סיסמא"
                                       type="password"
                                       name="password"
                                />
                            </div>
                            {error && <div className="error-msg">{error}</div>}
                            <div id="footer">
                                <Button dense raised color="primary" type="submit" id="login-button">
                                    <ArrowBackIcon/>היכנס
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
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
};
LoginRegister.defaultProps = {};

export default connect(
    // mapStateToProps
)(reduxForm({
    form: 'loginRegisterForm',
})(CSSModules(LoginRegister, styles)));


