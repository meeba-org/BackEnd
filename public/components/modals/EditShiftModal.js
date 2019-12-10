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
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createShift, showDeleteShiftModal, updateShift, hideEditShiftModal} from "../../actions";
import {EShiftStatus} from "../../helpers/EShiftStatus";
import {isNumber, TIME_FORMAT} from "../../helpers/utils";
import * as selectors from "../../selectors";
import TasksSelectionContainer from "../tasks/TasksSelectionContainer";
import withShiftLogic from "../withShiftLogic";

const moment = require("moment");

const styles = {
    dialogActionsWhilePending: {
        minWidth: "15vw",
        justifyContent: "space-between",
        marginTop: "20px"
    },
    dialogActions: {
        justifyContent: "center",
        marginTop: "20px"
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
        marginRight: "32px",
        marginBottom: "12px"
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
        let {hideEditShiftModal, callBack} = this.props;

        if (callBack)
            callBack(this.state.entity);

        hideEditShiftModal();
    };

    onApproval = () => {
        const {entity} = this.state;
        let draftShift = this.extractDraftShift(entity);

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

    extractDraftShift(entity) {
        // eslint-disable-next-line no-unused-vars
        let {_id, ...draftShift} = entity.draftShift || {}; // Excluding the id

        // Deleting null / undefined values
        for (let key in draftShift) {
            if (!draftShift[key])
                delete draftShift[key];
        }

        return draftShift;
    }

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
        this.handleClose();
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

        let updatedShift;
        if (this.isDraftPublicTransportationExist(entity)) {
            updatedShift = {
                ...entity,
                draftShift: {
                    ...entity.draftShift,
                    commuteCost: {
                        publicTransportation: value || 0
                    }
                }
            };
        }
        else {
            updatedShift = {
                ...entity,
                commuteCost: {
                    ...entity.commuteCost,
                    publicTransportation: value || 0
                }
            };
        }

        this.setState({
            entity: updatedShift
        });

        this.updateShift(entity, updatedShift);
    };

    updateShift = (orgShift, updatedShift) => {
        let month = moment(orgShift.clockInTime).format('MM');
        let year = moment(orgShift.clockInTime).format('YYYY');
        let {updateShift, postUpdate} = this.props;

        updateShift(updatedShift, month, year, postUpdate);
    };

    onUpdateStartDate = (date, orgShift) => {
        const {onUpdateStartDate, onDraftUpdateStartDate} = this.props;
        let updatedShift;

        if (this.isDraftClockInTimeExist(orgShift))
            updatedShift = onDraftUpdateStartDate(date, orgShift); // Updating the draft orgShift
        else
            updatedShift = onUpdateStartDate(date, orgShift); // Updating the orgShift

        this.onUpdate(orgShift, updatedShift);
    };

    onUpdateStartTime = (date, orgShift) => {
        const {onUpdateStartTime, onDraftUpdateStartTime} = this.props;
        let updatedShift;

        if (this.isDraftClockInTimeExist(orgShift))
            updatedShift = onDraftUpdateStartTime(date, orgShift); // Updating the draft shift
        else
            updatedShift = onUpdateStartTime(date, orgShift); // Updating the shift

        this.onUpdate(orgShift, updatedShift);
    };

    onUpdateEndTime = (date, orgShift) => {
        const {onUpdateEndTime, onDraftUpdateEndTime} = this.props;
        let updatedShift;

        if (this.isDraftClockOutTimeExist(orgShift))
            updatedShift = onDraftUpdateEndTime(date, orgShift); // Updating the draft shift
        else
            updatedShift = onUpdateEndTime(date, orgShift); // Updating the shift

        this.onUpdate(orgShift, updatedShift);
    };

    onUpdate = (orgShift, updatedShift) => {
        this.updateShift(orgShift, updatedShift);
        this.setState({entity: updatedShift});
    };

    isDraftClockInTimeExist(shift) {
        return shift.draftShift && shift.draftShift.clockInTime;
    }

    isDraftClockOutTimeExist(shift) {
        return shift.draftShift && shift.draftShift.clockOutTime;
    }

    isDraftPublicTransportationExist(shift) {
        if (!shift.draftShift || !shift.draftShift.commuteCost)
            return false;

        return isNumber(shift.draftShift.commuteCost.publicTransportation) || shift.draftShift.commuteCost.publicTransportation === "";
    }

    isPublicTransportationExist(shift) {
        return shift && shift.commuteCost && shift.commuteCost.publicTransportation;
    }

    calcDate = (shift) => {
        if (this.isDraftClockInTimeExist(shift))
               return shift.draftShift.clockInTime;
        else
            return shift.clockInTime;
    };

    calcDateHelperText = (shift) => {
        if (!this.isDraftClockInTimeExist(shift) || !shift.clockInTime)
            return null;

        if (moment(shift.clockInTime).isSame(moment(shift.draftShift.clockInTime), 'day')) // same date on draft
            return null;

        let date = moment(shift.clockInTime).format("DD/MM/YYYY");
        return <label>היה: {date}</label>;
    };

    calcClockInTime = (shift) => {
        if (this.isDraftClockInTimeExist(shift))
            return shift.draftShift.clockInTime;
        else
            return shift.clockInTime;
    };

    calcClockInTimeHelperTet = (shift) => {
        if (!this.isDraftClockInTimeExist(shift) || !shift.clockInTime)
            return null;

        if (moment(shift.clockInTime).format(TIME_FORMAT) === moment(shift.draftShift.clockInTime).format(TIME_FORMAT)) // same time on draft
            return null;

        let clockInTime = moment(shift.clockInTime).format(TIME_FORMAT);
        return <label>היה: {clockInTime}</label>;
    };

    calcClockOutTime = (shift) => {
        if (this.isDraftClockOutTimeExist(shift))
            return shift.draftShift.clockOutTime;
        else
            return shift.clockOutTime;
    };

    calcClockOutTimeHelperText = (shift) => {
        const clockOutTime = shift.clockOutTime;
        const draftClockOutTime = shift.draftShift.clockOutTime;

        if (!this.isDraftClockOutTimeExist(shift) || !clockOutTime)
            return null;

        if (moment(clockOutTime).format(TIME_FORMAT) === moment(draftClockOutTime).format(TIME_FORMAT)) // same time on draft
            return null;

        let clockOutTimeStr = clockOutTime ? moment(clockOutTime).format(TIME_FORMAT) : "--:--";
        return <label><span style={{ color: "lightgray"}}>היה: </span>{clockOutTimeStr}</label>;
    };

    calcPublicTransportation = (shift) => {
        if (this.isDraftPublicTransportationExist(shift) && shift.status === EShiftStatus.PENDING)
            return shift.draftShift.commuteCost.publicTransportation;
        else {
            if (!shift.commuteCost)
                return undefined;

            return shift.commuteCost.publicTransportation;
        }
    };

    calcPublicTransportationHelperText = (shift) => {
        if (this.isPublicTransportationExist(shift)){
            if (!this.isDraftPublicTransportationExist(shift) && shift.status !== EShiftStatus.PENDING)
                return null;

            // Has also draft - helper text hold the original
            let publicTransportation = shift.commuteCost.publicTransportation;
            return <label>היה: {publicTransportation}</label>;
        }

        // No original pt
        if (this.isDraftPublicTransportationExist(shift))
            return <label>היה: -</label>;

        // No original && no draft
        return null;
    };

    render() {
        let {open, classes, isCommuteFeatureEnable, isTasksFeatureEnable} = this.props;
        let shift = this.state.entity;

        if (!shift)
            return null;

        let {note, extraPay, breakLength, task, status} = shift || {};
        let date = this.calcDate(shift);
        let dateHelperText = this.calcDateHelperText(shift);
        let clockInTime = this.calcClockInTime(shift);
        let clockInTimeHelperText = this.calcClockInTimeHelperTet(shift);
        let clockOutTime = this.calcClockOutTime(shift);
        let clockOutTimeHelperText = this.calcClockOutTimeHelperText(shift);
        let publicTransportation = this.calcPublicTransportation(shift);
        let publicTransportationHelperText = this.calcPublicTransportationHelperText(shift);
        let isStatusPending = status === EShiftStatus.PENDING;

        return (
            <Dialog onClose={this.handleClose} open={open} >
                <DialogTitle>{isStatusPending ? "אישור שינוי משמרת": "עריכת משמרת"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <ESMDatePicker
                        autoOk
                        onChange={(date) => this.onUpdateStartDate(date, shift)}
                        value={date}
                        format="DD/MM/YYYY"
                        style={{margin: "0 10px 0 0"}}
                        disableFuture
                        helperText={dateHelperText}
                        label={"תאריך"}
                    />

                    <ESMTimePicker
                        ampm={false}
                        autoOk
                        value={clockInTime}
                        onChange={(time) => this.onUpdateStartTime(time, shift)}
                        helperText={clockInTimeHelperText}
                        label={"שעת כניסה"}
                    />

                    <ESMTimePicker
                        ampm={false}
                        autoOk
                        value={clockOutTime}
                        onChange={(time) => this.onUpdateEndTime(time, shift)}
                        helperText={clockOutTimeHelperText}
                        label={"שעת יציאה"}
                    />

                    <ESMTextInput
                        onChange={(e) => this.handleShiftChange("note", e.target.value)}
                        value={note}
                        type={"text"}
                        TIIcon={CommentIcon}
                        label={"הערות"}
                        />

                    <ESMTextInput
                        onChange={(e) => this.handleShiftChange("extraPay", e.target.value)}
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

                    <DialogActions classes={{root: isStatusPending ? classes.dialogActionsWhilePending :  classes.dialogActions}} >
                            <div style={{flex: isStatusPending ? 0.45 : 1, justifyContent: isStatusPending ? "flex-start" : "center", display: "flex"}}>
                                <Button onClick={this.handleClose} autoFocus color="primary">
                                    סגור
                                </Button>
                            </div>
                            {isStatusPending &&
                            <div style={{display: "flex", flex: 0.55, justifyContent: "space-between"}}>
                                <Button variant="contained" onClick={this.onDecline} autoFocus >
                                    דחה
                                </Button>
                                <Button variant="contained" onClick={this.onApproval} autoFocus color="primary">
                                    אשר
                                </Button>
                            </div>
                            }
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

function mapDispatchToProps(dispatch) {
    return {
        createShift: (shift) => dispatch(createShift(shift, dispatch)),
        updateShift: (shift, month, year, postUpdate) => dispatch(updateShift(shift, dispatch, postUpdate, month, year)),
        deleteShift: (shift, month, year) => dispatch(showDeleteShiftModal(shift, dispatch, month, year)),
        hideEditShiftModal: () => dispatch(hideEditShiftModal())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withShiftLogic(EditShiftModal)));
