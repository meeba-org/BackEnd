import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";
import ExtraFeeIcon from "@material-ui/icons/CardGiftcard";
import CommentIcon from "@material-ui/icons/Comment";
import BusIcon from "@material-ui/icons/DirectionsBus";
import BreakIcon from "@material-ui/icons/FreeBreakfast";
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {hideEditShiftModal} from "../../actions/index";
import * as selectors from "../../selectors";
import TasksSelectionContainer from "../tasks/TasksSelectionContainer";

const moment = require("moment");

const styles = {
    dialogActionsRoot: {
        justifyContent: "center"
    },
    dialogContentRoot: {
        display: "flex",
        flexDirection: "column"
    }
};

export const ESMTextInput = ({TIIcon, value, onChange, type, label}) => {
    return (
        <Grid container spacing={8} alignItems="flex-end">
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
        callBack(this.state.entity);

        dispatch(hideEditShiftModal());
    };

    handleNoteChange = (event) => {
        const {entity} = this.state;

        let updatedShift = {
            ...entity,
            note: event.target.value,
        };

        this.setState({
            entity: updatedShift
        });

        this.updateShift(entity, updatedShift);
    };

    handleExtraPayChange = (event) => {
        const {entity} = this.state;

        let updatedShift = {
            ...entity,
            extraPay: event.target.value,
        };

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
        let key = event.target.id;
        let value = event.target.value;
        const {entity} = this.state;

        let updatedShift = {
            ...entity,
            commuteCost: {
                ...entity.commuteCost,
                [key]: value || 0
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
        let {updateShift, dispatch} = this.props;

        dispatch(updateShift(updatedShift, dispatch, false, month, year));
    };

    handleCancel = () => {
        this.props.dispatch(hideEditShiftModal());
    };

    render() {
        let {open, classes, isCommuteFeatureEnable} = this.props;
        let {note, extraPay, breakLength, commuteCost} = this.state.entity || {};
        let {publicTransportation} = commuteCost || {};

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"עריכת משמרת"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
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
                        />
                    }

                    <ESMTextInput
                        onChange={(e) => this.handleShiftChange("breakLength", e.target.value)}
                        value={breakLength}
                        type={"number"}
                        TIIcon={BreakIcon}
                        label={"הפסקה (דקות)"}
                    />

                    <TasksSelectionContainer/>

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

EditShiftModal.propTypes = {
    entity: PropTypes.object,
    classes: PropTypes.object,
    editShift: PropTypes.func,
    updateShift: PropTypes.func,
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

    };
};
export default connect(mapStateToProps)(withStyles(styles)(EditShiftModal));
