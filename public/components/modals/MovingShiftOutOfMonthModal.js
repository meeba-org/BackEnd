import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import {hideDeleteEntityModal} from "../../actions/index";
import PropTypes from 'prop-types';
import moment from "moment";

class MovingShiftOutOfMonthModal extends Component {

    updateShift = () => {
        let {dispatch, updateShift, entity, month, year, shouldFetchMonthlyReport} = this.props;

        dispatch(updateShift(entity, dispatch, shouldFetchMonthlyReport, month, year));
        dispatch(hideDeleteEntityModal());
    };

    handleCancel = () => {
        this.props.dispatch(hideDeleteEntityModal());
    };

    render() {
        let {open, entity} = this.props;
        let month = moment(entity.clockInTime).format('MM/YYYY');


        return (
            <Dialog onClose={this.handleCancel} open={open}>
                <DialogTitle>{`הינך מעביר משמרת ל-${month} - האם אתה בטוח?`}</DialogTitle>
                <DialogActions>
                    <Button variant="raised" onClick={() => this.updateShift()} color="primary" autoFocus>
                        כן
                    </Button>
                    <Button onClick={this.handleCancel} color="primary">
                        לא
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

MovingShiftOutOfMonthModal.propTypes = {
    entity: PropTypes.object,
    updateShift: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    month: PropTypes.string,
    year: PropTypes.string,
    input: PropTypes.object,
    shouldFetchMonthlyReport: PropTypes.bool,
};

export default connect()(MovingShiftOutOfMonthModal);
