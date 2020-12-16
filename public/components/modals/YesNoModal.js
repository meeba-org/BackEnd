import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';
import React from 'react';
import {connect, useDispatch} from "react-redux";
import {hideYesNoModal} from "../../actions/index";

const YesNoModal = ({ open, text, onAction, hideYesNoModal }) => {
   let dispatch = useDispatch();
   
    const handleAction = () => {
        dispatch(onAction());
        hideYesNoModal();
    };

    return (
        <Dialog onClose={hideYesNoModal} open={open}>
            <DialogTitle>{text}</DialogTitle>
            <DialogActions>
                <Button variant="contained" onClick={handleAction} color="primary" autoFocus>כן</Button>
                <Button onClick={hideYesNoModal} color="primary">לא</Button>
            </DialogActions>
        </Dialog>
    );
};

const mapDispatchToProps = {
    hideYesNoModal
};

YesNoModal.propTypes = {
    handleAction: PropTypes.func,
    open: PropTypes.bool.isRequired,
};

YesNoModal.defaultProps = {
    text: ""
};

export default connect(null, mapDispatchToProps)(YesNoModal);
