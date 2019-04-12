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
        justifyContent: "center",
        minWidth: "15vw"
    },
    dialogContentRoot: {
        display: "flex",
        flexDirection: "column",
    },
    helperText: {
        color: "orange"
    }
};

const pickerStyle = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    datePicker: {
        margin: 0
    },
};

const ESMDatePicker = withStyles(pickerStyle)(({helperText, classes, ...other}) => {

    return (
        <div className={classes.container}>
            <DatePicker classes={{root: classes.datePicker}} {...other} />
            {helperText &&
                helperText
            }
        </div>
    )
});

const ESMTextInput = ({TIIcon, value, onChange, type, label, helperText}) => {
    return (
        <Grid container spacing={8} alignItems={!!helperText ? "center" : "flex-end"}>
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
                    helperText={helperText}
                />
            </Grid>
        </Grid>
    );
};

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
        const {onUpdateStartDate} = this.props;

        shift = onUpdateStartDate(date, shift); // Self assigning updated shift
        this.onUpdate(shift);
    };

    onUpdateStartTime = (date, shift) => {
        const {onUpdateStartTime} = this.props;

        shift = onUpdateStartTime(date, shift); // Self assigning updated shift
        this.onUpdate(shift);
    };

    onUpdateEndTime = (date, shift) => {
        const {onUpdateEndTime} = this.props;

        shift = onUpdateEndTime(date, shift); // Self assigning updated shift
        this.onUpdate(shift);
    };

    onUpdate(shift) {
        this.setState({entity: shift});
    }

    calcDraftPublicTransportation = (draftShift) => {
        if (!draftShift || !draftShift.commuteCost)
            return null;

        const {classes} = this.props;
        let draftPublicTransportation = draftShift.commuteCost.publicTransportation;
        return <FormHelperText classes={{root: classes.helperText}}>ערך קודם: {draftPublicTransportation}</FormHelperText>;
    };

    render() {
        let {open, classes, isCommuteFeatureEnable, isTasksFeatureEnable} = this.props;
        let shift = this.state.entity;

        if (!shift)
            return null;

        let {note, extraPay, breakLength, commuteCost, task, status} = shift || {};
        let {publicTransportation} = commuteCost || {};
        let draftPublicTransportation = this.calcDraftPublicTransportation(shift.draftShift);

        return (
            <Dialog onClose={this.handleClose} open={open} >
                <DialogTitle>{status === EShiftStatus.PENDING ? "אישור משמרת": "עריכת משמרת"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <ESMDatePicker
                        autoOk
                        onChange={(date) => this.onUpdateStartDate(date, shift)}
                        value={shift.clockInTime}
                        format="DD/MM/YYYY"
                        style={{margin: "0 10px 0 0"}}
                        disableFuture
                        helperText={<FormHelperText classes={{root: classes.helperText}}>ערך קודם: {55}</FormHelperText>}
                    />

                    <TimePicker
                        ampm={false}
                        autoOk
                        value={shift.clockInTime}
                        onChange={(time) => this.onUpdateStartTime(time, shift)}
                    />

                    <TimePicker
                        ampm={false}
                        autoOk
                        value={shift.clockOutTime}
                        onChange={(time) => this.onUpdateEndTime(time, shift)}
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
                            helperText={draftPublicTransportation}
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

                    <DialogActions classes={{root: classes.dialogActionsRoot}}>
                        <Fragment>
                            <Button variant="contained" onClick={this.handleClose} autoFocus color="primary">
                                סגור
                            </Button>
                            {status === EShiftStatus.PENDING &&
                            <Fragment>
                                <Button variant="contained" onClick={this.handleClose} autoFocus color="primary">
                                    אשר
                                </Button>
                                <Button variant="contained" onClick={this.handleClose} autoFocus color="primary">
                                    דחה
                                </Button>
                            </Fragment>
                            }
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
