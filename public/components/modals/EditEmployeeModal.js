import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {withStyles, createStyles}  from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {hideEditEmployeeModal} from "../../actions";
import MbSwitch from "../MbSwitch";

const styles = createStyles({
    dialogActionsRoot: {
        justifyContent: "center",
        paddingTop: "20px"
    },
    dialogContentRoot: {
        display: "flex",
        flexDirection: "column"
    }
});

class EditEmployeeModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entity: props.entity
        };
    }

    handleClose = () => {
        let {hideEditEmployeeModal} = this.props;

        hideEditEmployeeModal();
    };


    updateEmployee = (event, fieldName) => {
        const {entity} = this.state;

        let updatedEmployee = {
            ...entity,
            [fieldName]: event.target.value,
        };

        this.updateUser(updatedEmployee);
    };

    updateTransportPaymentPer = (event) => {
        const {entity} = this.state;

        let updatedEmployee = {
            ...entity,
            transportPaymentPer: event.target.checked ? 0 : 1,
        };

        this.updateUser(updatedEmployee);
    };

    updateUser(updatedEmployee) {
        this.setState({
            entity: updatedEmployee
        });

        let {updateUser} = this.props;

        updateUser(updatedEmployee);
    }

    render() {
        let {open, classes} = this.props;
        let {entity} = this.state;

        return (
            <Dialog onClose={this.handleClose} open={open}>
                <DialogTitle>{"עריכת עובד"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>
                            <TextField
                                id="transportation"
                                label="נסיעות"
                                placeholder="נסיעות"
                                value={entity && entity.transportation}
                                onChange={(e) => this.updateEmployee(e, "transportation")}
                            />
                        </Grid>
                        <Grid item>
                            <MbSwitch
                                firstLabel="חודשי" secondLabel="למשמרת"
                                onChange={(e) => this.updateTransportPaymentPer(e)}
                                checked={entity && entity.transportPaymentPer === 0}
                            />
                        </Grid>
                    </Grid>

                    <DialogActions classes={{root: classes.dialogActionsRoot}}>
                        <Button variant="contained" onClick={this.handleClose} autoFocus color="primary">
                            סגור
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    }
}

EditEmployeeModal.propTypes = {
    entity: PropTypes.object,
    classes: PropTypes.object,
    editShift: PropTypes.func,
    updateUser: PropTypes.func,
    open: PropTypes.bool.isRequired,
    isCommuteFeatureEnable: PropTypes.bool,
    month: PropTypes.string,
    year: PropTypes.string,
};

const mapDispatchToProps = {
    hideEditEmployeeModal
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(EditEmployeeModal));
