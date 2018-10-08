import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Switch from "@material-ui/core/Switch";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import {hideEditEmployeeModal} from "../../actions";
import TextField from "@material-ui/core/TextField";

const styles = {
    dialogActionsRoot: {
        justifyContent: "center"
    },
    dialogContentRoot: {
        display: "flex",
        flexDirection: "column"
    }
};

class EditEmployeeModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entity: props.entity
        };
    }

    handleClose = () => {
        let {dispatch, callBack} = this.props;
        if (callBack)
            callBack(this.state.entity);

        dispatch(hideEditEmployeeModal());
    };

    updateEmployee = (event, fieldName) => {
        const {entity} = this.state;

        let updatedEmployee = {
            ...entity,
            [fieldName]: event.target.value,
        };

        this.setState({
            entity: updatedEmployee
        });

        let {updateUser, dispatch} = this.props;

        dispatch(updateUser(updatedEmployee));
    };

    render() {
        let {open, classes} = this.props;
        let {entity} = this.state;
        let transportPaymentPer;
        if (entity) {
            transportPaymentPer = entity.transportPaymentPer;
        }

        return (
            <Dialog onClose={this.handleClose} open={open}>
                <DialogTitle>{"עריכת עובד"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <TextField
                                id="transportation"
                                label="נסיעות"
                                placeholder="נסיעות"
                                value={entity && entity.transportation}
                                onChange={(e) => this.updateEmployee(e, "transportation")}
                            />

                            <Switch
                                onChange={(e) => this.updateEmployee(e, "transportPaymentPer")}
                                checked={entity && entity.transportPaymentPer}
                                value={transportPaymentPer}
                            />
                        </Grid>
                    </Grid>

                    <DialogActions classes={{root: classes.dialogActionsRoot}}>
                        <Button variant="raised" onClick={this.handleClose} autoFocus color="primary">
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
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    isCommuteFeatureEnable: PropTypes.bool,
    month: PropTypes.string,
    year: PropTypes.string,
    callBack: PropTypes.func,
};

export default connect()(withStyles(styles)(EditEmployeeModal));
