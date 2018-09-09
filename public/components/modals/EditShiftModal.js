import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {hideEditShiftModal} from "../../actions/index";
import PropTypes from 'prop-types';

class EditShiftModal extends Component {

    handleEdit = () => {
        let {dispatch, editShift, entity, month, year} = this.props;

        dispatch(editShift(entity, dispatch, month, year));
        dispatch(hideEditShiftModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideEditShiftModal());
    };

    render() {
        let {open} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"עריכת משמרת"}</DialogTitle>
                <DialogActions>
                    <Button variant="raised" onClick={() => this.handleEdit()} color="primary" autoFocus>
                        כן
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                        לא
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

EditShiftModal.propTypes = {
    entity: PropTypes.object,
    editShift: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

export default connect()(EditShiftModal);
