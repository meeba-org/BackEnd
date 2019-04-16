import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from "@material-ui/core/Grid";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";
import ExtraFeeIcon from "@material-ui/icons/CardGiftcard";
import CommentIcon from "@material-ui/icons/Comment";
import BusIcon from "@material-ui/icons/DirectionsBus";
import BreakIcon from "@material-ui/icons/FreeBreakfast";
import DatePicker from "material-ui-pickers/DatePicker";
import TimePicker from "material-ui-pickers/TimePicker";
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {hideEditShiftModal} from "../../actions/index";
import {EShiftStatus} from "../../helpers/EShiftStatus";
import * as selectors from "../../selectors";
import TasksSelectionContainer from "../tasks/TasksSelectionContainer";
import withShiftLogic from "../withShiftLogic";

const moment = require("moment");

const styles = {
    dialogActionsRoot: {
        minWidth: "15vw"
    },
    dialogContentRoot: {
        display: "flex",
        flexDirection: "column",
    }
};

const pickerStyle = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginRight: "32px"
    },
    datePicker: {
        margin: "0 !important"
    },
    helperText: {
        color: "orange"
    }
};

const ESMTimePicker = withStyles(pickerStyle)(({helperText, classes, ...other}) => {

    return (
        <div className={classes.container}>
            <TimePicker classes={{root: classes.datePicker}} {...other} />
            {helperText &&
                <FormHelperText classes={{root: classes.helperText}}>{helperText}</FormHelperText>
            }
        </div>
    );
});

const ESMDatePicker = withStyles(pickerStyle)(({helperText, classes, ...other}) => {

    return (
        <div className={classes.container}>
            <DatePicker classes={{root: classes.datePicker}} {...other} />
            {helperText &&
                <FormHelperText classes={{root: classes.helperText}}>{helperText}</FormHelperText>
            }
        </div>
    );
});

const ESMTextInput = withStyles(pickerStyle)(({classes, TIIcon, value, onChange, type, label, helperText}) => {
    return (
        <Grid container spacing={8} alignItems={helperText ? "center" : "flex-end"}>
            <Grid item>
                <TIIcon style={{color: "grey"}}/>
            </Grid>
            <Grid item>
                <TextField
                    label={label}
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    type={type}
                    helperText={helperText && <label className={classes.helperText}>{helperText}</label>}
                />
            </Grid>
        </Grid>
    );
});

class EditShiftModal extends Component {

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

        dispatch(hideEditShiftModal());
    };

    onApproval = () => {
        const {entity} = this.state;
        let {_id, ...draftShift} = entity.draftShift; // Excluding the id

        let updatedShift = {
            ...entity,
            ...draftShift, // overriding with the draft values
            status: EShiftStatus.APPROVED,
            draftShift: null
        };

        this.setState({
            entity: updatedShift
        });

        this.updateShift(entity, updatedShift);
        this.handleClose();
    };

    onDecline = () => {
        const {entity} = this.state;

        let updatedShift = {
            ...entity,
            status: EShiftStatus.DECLINED,
            draftShift: null
        };

        this.setState({
            entity: updatedShift
        });

        this.updateShift(entity, updatedShift);
    };

    handleExtraPayChange = (value) => {
        const {entity} = this.state;

        let updatedShift;
        if (shift.draftShift && shift.draftShift.extraPay) {
            updatedShift = {
                ...entity,
                draftShift: {
                    ...entity.draftShift,
                    extraPay: value,
                }
            };
        }
        else {
            updatedShift = {
                ...entity,
                extraPay: value,
            };
        }

        this.setState({
            entity: updatedShift
        });

        this.updateShift(entity, updatedShift);
    };

    handleShiftChange = (field, value) => {
        const {entity} = this.state;

        let updatedShift = {
            ...entity,
            [field]: value,
        };

        this.setState({
            entity: updatedShift
        });

        this.updateShift(entity, updatedShift);
    };

    handleCommuteCostChange = (event) => {
        let value = event.target.value;
        const {entity} = this.state;

        let updatedShift = {
            ...entity,
            commuteCost: {
                ...entity.commuteCost,
                publicTransportation: value || 0
            }
        };

        this.setState({
            entity: updatedShift
        });

        this.updateShift(entity, updatedShift);
    };

    updateShift = (entity, updatedShift) => {
        let month = moment(entity.clockInTime).format('MM');
        let year = moment(entity.clockInTime).format('YYYY');
        let {updateShift} = this.props;

        updateShift(updatedShift, month, year);
    };

    onUpdateStartDate = (date, shift) => {
        const {onUpdateStartDate, onDraftUpdateStartDate} = this.props;

        if (shift.draftShift && shift.draftShift.clockInTime)
            shift = onDraftUpdateStartDate(date, shift); // Updating the draft shift
        else
            shift = onUpdateStartDate(date, shift); // Updating the shift

        this.onUpdate(shift);
    };

    onUpdateStartTime = (date, shift) => {
        const {onUpdateStartTime, onDraftUpdateStartTime} = this.props;

        if (shift.draftShift && shift.draftShift.clockInTime)
            shift = onDraftUpdateStartTime(date, shift); // Updating the draft shift
        else
            shift = onUpdateStartTime(date, shift); // Updating the shift

        this.onUpdate(shift);
    };

    onUpdateEndTime = (date, shift) => {
        const {onUpdateEndTime, onDraftUpdateEndTime} = this.props;

        if (shift.draftShift && shift.draftShift.clockOutTime)
            shift = onDraftUpdateEndTime(date, shift); // Updating the draft shift
        else
            shift = onUpdateEndTime(date, shift); // Updating the shift

        this.onUpdate(shift);
    };

    onUpdate(shift) {
        this.setState({entity: shift});
    }

    calcPublicTransportationHelperText = (shift) => {
        if (!shift || !shift.commuteCost)
            return null;

        let publicTransportation = shift.commuteCost.publicTransportation;
        return <label>היה: {publicTransportation}</label>;
    };

    calcDateHelperText = (shift) => {
        if (!shift || !shift.clockInTime)
            return null;

        let date = moment(shift.clockInTime).format("DD/MM/YYYY");
        return <label>היה: {date}</label>;
    };

    calcClockInTimeHelperTet = (shift) => {
        if (!shift || !shift.clockInTime)
            return null;

        let clockInTime = moment(shift.clockInTime).format("HH:mm");
        return <label>היה: {clockInTime}</label>;
    };

    calcClockOutTimeHelperText = (shift) => {
        if (!shift || !shift.clockOutTime)
            return null;

        let clockOutTime = moment(shift.clockOutTime).format("HH:mm");
        return <label><span style={{ color: "lightgray"}}>היה: </span>{clockOutTime}</label>;
    };

    render() {
        let {open, classes, isCommuteFeatureEnable, isTasksFeatureEnable} = this.props;
        let shift = this.state.entity;

        if (!shift)
            return null;

        let {note, extraPay, breakLength, commuteCost, task, status} = shift || {};
        let {publicTransportation} = commuteCost || {};
        let publicTransportationHelperText = this.calcPublicTransportationHelperText(shift);
        let dateHelperText = this.calcDateHelperText(shift);
        let clockInTimeHelperText = this.calcClockInTimeHelperTet(shift);
        let clockOutTimeHelperText = this.calcClockOutTimeHelperText(shift);
        let isStatusPending = status === EShiftStatus.PENDING;

        return (
            <Dialog onClose={this.handleClose} open={open} >
                <DialogTitle>{isStatusPending ? "אישור משמרת": "עריכת משמרת"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <ESMDatePicker
                        autoOk
                        onChange={(date) => this.onUpdateStartDate(date, shift)}
                        value={shift.clockInTime}
                        format="DD/MM/YYYY"
                        style={{margin: "0 10px 0 0"}}
                        disableFuture
                        helperText={dateHelperText}
                    />

                    <ESMTimePicker
                        ampm={false}
                        autoOk
                        value={shift.clockInTime}
                        onChange={(time) => this.onUpdateStartTime(time, shift)}
                        helperText={clockInTimeHelperText}
                    />

                    <ESMTimePicker
                        ampm={false}
                        autoOk
                        value={shift.clockOutTime}
                        onChange={(time) => this.onUpdateEndTime(time, shift)}
                        helperText={clockOutTimeHelperText}
                    />

                    <ESMTextInput
                        onChange={(e) => this.handleShiftChange("note", e.target.value)}
                        value={note}
                        type={"text"}
                        TIIcon={CommentIcon}
                        label={"הערות"}

                        />

                    <ESMTextInput
                        onChange={(e) => this.handleExtraPayChange(e.target.value)}
                        value={extraPay}
                        type={"number"}
                        TIIcon={ExtraFeeIcon}
                        label={"תוספת תשלום"}
                        />

                    {isCommuteFeatureEnable &&
                        <ESMTextInput
                            onChange={this.handleCommuteCostChange}
                            value={publicTransportation}
                            type={"number"}
                            TIIcon={BusIcon}
                            label={"נסיעות"}
                            helperText={publicTransportationHelperText}
                        />
                    }

                    <ESMTextInput
                        onChange={(e) => this.handleShiftChange("breakLength", e.target.value)}
                        value={breakLength || ""}
                        type={"number"}
                        TIIcon={BreakIcon}
                        label={"הפסקה (דקות)"}
                    />

                    {isTasksFeatureEnable &&
                    <TasksSelectionContainer task={task} onChange={(task) => this.handleShiftChange("task", task)}/>
                    }

                    <DialogActions classes={{root: classes.dialogActionsRoot}} style={{justifyContent: isStatusPending ? "space-between" : "center"}}>
                        <Fragment>
                            {isStatusPending &&
                            <Fragment>
                                <Button variant="contained" onClick={this.onApproval} autoFocus color="secondary">
                                    אשר
                                </Button>
                                <Button variant="contained" onClick={this.onDecline} autoFocus >
                                    דחה
                                </Button>
                            </Fragment>
                            }
                            <Button variant="contained" onClick={this.handleClose} autoFocus color="primary">
                                סגור
                            </Button>
                        </Fragment>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    }
}

EditShiftModal.propTypes = {
    entity: PropTypes.object,
    classes: PropTypes.object,
    editShift: PropTypes.func,
    updateShift: PropTypes.func,
    deleteShift: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    isCommuteFeatureEnable: PropTypes.bool,
    month: PropTypes.string,
    year: PropTypes.string,
    callBack: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        isCommuteFeatureEnable: selectors.isCommuteFeatureEnable(state),
        isTasksFeatureEnable: selectors.isTasksFeatureEnable(state),
    };
};

export default connect(mapStateToProps)(withStyles(styles)(withShiftLogic(EditShiftModal)));
