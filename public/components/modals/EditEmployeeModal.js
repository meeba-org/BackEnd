import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {createStyles, withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
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

const EditEmployeeModal = ({open, classes,  entity, hideEditEmployeeModal, updateUser}) => {
    const [employee, setEmployee] = useState({});
    
    useEffect(() => {
        setEmployee(entity || {});
    }, [entity]);
    
    const updateEmployee = (event, fieldName) => {
        let updatedEmployee = {
            ...employee,
            [fieldName]: event.target.value,
        };

        handleUpdate(updatedEmployee);
    };

    const updateTransportPaymentPer = (event) => {
        let updatedEmployee = {
            ...employee,
            transportPaymentPer: event.target.checked ? 0 : 1, // TODO use enums
        };

        handleUpdate(updatedEmployee);
    };

    const handleUpdate = (updatedEmployee) => {
        setEmployee(updatedEmployee);
        updateUser(updatedEmployee);
    };

    return (
        <Dialog onClose={hideEditEmployeeModal} open={open}>
            <DialogTitle>{"הגדרות נוספות לעובד"}</DialogTitle>
            <DialogContent classes={{root: classes.dialogContentRoot}}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item>
                        <TextField
                            id="transportation"
                            label="נסיעות"
                            placeholder="נסיעות"
                            value={employee.transportation}
                            onChange={(e) => updateEmployee(e, "transportation")}
                        />
                    </Grid>
                    <Grid item>
                        <MbSwitch
                            firstLabel="חודשי" secondLabel="למשמרת"
                            onChange={(e) => updateTransportPaymentPer(e)}
                            checked={employee.transportPaymentPer === 0}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <TextField
                        label="שכר בסיס"
                        placeholder="שכר בסיס"
                        value={employee.baseSalary}
                        onChange={(e) => updateEmployee(e, "baseSalary")}
                    />
                </Grid>

                <DialogActions classes={{root: classes.dialogActionsRoot}}>
                    <Button variant="contained" onClick={hideEditEmployeeModal} autoFocus color="primary">
                        סגור
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

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
