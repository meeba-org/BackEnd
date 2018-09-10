import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {hideEditShiftModal} from "../../actions/index";
import PropTypes from 'prop-types';

const moment = require("moment");

class EditShiftModal extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps, prevState) {
        const {entity} = this.nextProps;
        if (!!entity) {
            if (!!entity.commuteCost) {
                this.setState({
                    commuteHours: entity.commuteHours,
                    kmDriving: entity.kmDriving,
                    parkingCost: entity.parkingCost
                });
            }

            this.setState({note: entity.note});
        }
    };

    handleSave = () => {
        let {dispatch, updateShift, entity} = this.props;
        const {note, commuteHours, kmDriving, parkingCost} = this.state;

        let updatedShift = {
            ...entity,
            note,
            commuteCost: {
                commuteHours,
                kmDriving,
                parkingCost
            }
        };

        let month = moment(entity.clockInDate).format('MM');
        let year = moment(entity.clockInDate).format('YYYY');
        dispatch(updateShift(updatedShift, dispatch, month, year));
        dispatch(hideEditShiftModal());
    };

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

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
                    id="note"
                    margin="normal"
                    onChange={this.handleChange}
                >
                    {!!entity ? entity.note  : ""}
                </TextField>

                <TextField
                    label="שעות נסיעה"
                    margin="normal"
                    id="commuteHours"
                    onChange={this.handleChange}
                 />

                <TextField
                    label='כמות ק"מ'
                    margin="normal"
                    id="kmDriving"
                    onChange={this.handleChange}
                 />

                <TextField
                    label="עלות חניה"
                    margin="normal"
                    id="parkingCost"
                    onChange={this.handleChange}
                 />


                <DialogActions>
                    <Button variant="raised" onClick={this.handleSave} color="primary" autoFocus>
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
