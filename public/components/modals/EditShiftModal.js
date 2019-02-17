import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {hideEditShiftModal} from "../../actions/index";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {FeatureName} from "../../helpers/FeatureName";
import * as selectors from "../../selectors";
import CommentIcon from "@material-ui/icons/Comment";
import ExtraFeeIcon from "@material-ui/icons/CardGiftcard";
import BreakIcon from "@material-ui/icons/FreeBreakfast";
import BusIcon from "@material-ui/icons/DirectionsBus";
import Grid from "@material-ui/core/Grid";

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
// Comment testing CI
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
        let {open, classes, isCommuteFeatureEnable, enableCommute} = this.props;
        let {note, extraPay, breakLength, commuteCost} = this.state.entity || {};
        let {publicTransportation} = commuteCost || {};

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"עריכת משמרת"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <CommentIcon style={{color: "grey"}}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="הערות"
                                id="note"
                                margin="normal"
                                onChange={(e) => this.handleShiftChange("note", e.target.value)}
                                value={note}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <ExtraFeeIcon style={{color: "grey"}}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="תוספת תשלום"
                                id="extra-pay"
                                margin="normal"
                                onChange={(e) => this.handleShiftChange("extraPay", e.target.value)}
                                value={extraPay}
                            />
                        </Grid>
                    </Grid>

                    {isCommuteFeatureEnable && enableCommute &&
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <BusIcon style={{color: "grey"}}/>
                            </Grid>
                            <Grid item>

                                <TextField
                                    label="נסיעות"
                                    margin="normal"
                                    id="publicTransportation"
                                    onChange={this.handleCommuteCostChange}
                                    value={publicTransportation}
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                    }

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <BreakIcon style={{color: "grey"}}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="הפסקה (דקות)"
                                id="break-length"
                                margin="normal"
                                onChange={(e) => this.handleShiftChange("breakLength", e.target.value)}
                                value={breakLength}
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

EditShiftModal.propTypes = {
    entity: PropTypes.object,
    classes: PropTypes.object,
    editShift: PropTypes.func,
    updateShift: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    isCommuteFeatureEnable: PropTypes.bool,
    enableCommute: PropTypes.bool,
    month: PropTypes.string,
    year: PropTypes.string,
    callBack: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        isCommuteFeatureEnable: selectors.isFeatureEnable(state, FeatureName.CommuteModule),
        enableCommute: selectors.getCompanySettings(state).enableCommute,
    };
};
export default connect(mapStateToProps)(withStyles(styles)(EditShiftModal));
