import React, {Component, Fragment} from 'react';
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
        let month = moment(entity.clockInDate).format('MM');
        let year = moment(entity.clockInDate).format('YYYY');
        let {updateShift, dispatch} = this.props;

        dispatch(updateShift(updatedShift, dispatch, false, month, year));
    }

    handleCancel = () => {
        this.props.dispatch(hideEditShiftModal());
    };

    render() {
        let {open, classes, isCommuteFeatureEnable} = this.props;
        let {entity} = this.state;
        let note = "", publicTransportation = "", commuteHours = "", kmDriving = "", parkingCost = "";
        if (entity) {
            note = entity.note;

            if (entity.commuteCost) {
                publicTransportation = entity.commuteCost.publicTransportation;
                commuteHours = entity.commuteCost.commuteHours;
                kmDriving = entity.commuteCost.kmDriving;
                parkingCost = entity.commuteCost.parkingCost;
            }
        }

        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{"עריכת משמרת"}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <TextField
                        label="הערות"
                        id="note"
                        margin="normal"
                        onChange={this.handleNoteChange}
                        value={note}
                    />

                    {isCommuteFeatureEnable &&
                    <Fragment>
                        <TextField
                            label="תחבורה ציבורית"
                            margin="normal"
                            id="publicTransportation"
                            onChange={this.handleCommuteCostChange}
                            value={publicTransportation}
                            type="number"
                        />

                        <TextField
                            label="שעות נסיעה"
                            margin="normal"
                            id="commuteHours"
                            onChange={this.handleCommuteCostChange}
                            value={commuteHours}
                            type="number"
                        />

                        < TextField
                            label='כמות ק"מ'
                            margin="normal"
                            id="kmDriving"
                            onChange={this.handleCommuteCostChange}
                            value={kmDriving}
                            type="number"
                        />

                        <TextField
                            label="עלות חניה"
                            margin="normal"
                            id="parkingCost"
                            onChange={this.handleCommuteCostChange}
                            value={parkingCost}
                            type="number"
                        />
                    </Fragment>
                    }

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
    editShift: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        isCommuteFeatureEnable: selectors.isFeatureEnable(state, FeatureName.CommuteModule),
    };
};
export default connect(mapStateToProps)(withStyles(styles)(EditShiftModal));
