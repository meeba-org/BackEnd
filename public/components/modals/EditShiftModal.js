import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {hideEditShiftModal} from "../../actions/index";
import PropTypes from 'prop-types';

class EditShiftModal extends Component {

    handleSave = () => {
        let {dispatch, editShift, entity, month, year} = this.props;

        dispatch(editShift(entity, dispatch, month, year));
        dispatch(hideEditShiftModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideEditShiftModal());
    };

    render() {
        let {open, entity} = this.props;
        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"עריכת משמרת"}</DialogTitle>
                <TextField
                    label="הערות"
                    margin="normal"
                    onChange={() => {}}
                >
                    {entity.note}
                </TextField>

                <TextField
                    label="שעות נסיעה"
                    margin="normal"
                    onChange={() => {}}
                >
                </TextField>

                <TextField
                    label='כמות ק"מ'
                    margin="normal"
                    onChange={() => {}}
                >
                </TextField>

                <TextField
                    label="עלות חניה"
                    margin="normal"
                    onChange={() => {}}
                >
                </TextField>


                <DialogActions>
                    <Button variant="raised" onClick={() => this.handleSave()} color="primary" autoFocus>
                        שמירה
                    </Button>
                    <Button onClick={this.handleCancel} color="secondary">
                        ביטול
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
