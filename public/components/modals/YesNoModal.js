import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideYesNoModal} from "../../actions/index";

class YesNoModal extends Component {

    onAction = () => {
        let {dispatch, onAction} = this.props;

        dispatch(onAction());
        dispatch(hideYesNoModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideYesNoModal());
    };

    render() {
        let {open, text} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{text}</DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={() => this.onAction()} color="primary" autoFocus>כן</Button>
                    <Button onClick={this.handleCancel} color="primary">לא</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

YesNoModal.propTypes = {
    handleAction: PropTypes.func,
    open: PropTypes.bool.isRequired,
};

YesNoModal.defaultProps = {
    text: ""
};

export default connect()(YesNoModal);
