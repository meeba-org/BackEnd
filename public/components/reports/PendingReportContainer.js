import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {fetchPendingShifts, showDeleteShiftModal, showEditShiftModal, updateShift} from "../../actions";
import {getPendingShifts} from "../../selectors";
import PendingReport from "./PendingReport";

class PendingReportContainer extends PureComponent {

    componentDidMount() {
        this.fetchPendingShifts();
    }

    fetchPendingShifts = () => {
        this.props.fetchPendingShifts();
    };

    render() {
        const {updateShift, deleteShift, showShiftDialog, shifts, isLoading} = this.props;

        return (
            <PendingReport
                shifts={shifts}
                onDeleteShift={deleteShift}
                onUpdateShift={updateShift}
                showShiftDialog={showShiftDialog}
                isLoading={isLoading}
                onRefresh={this.fetchPendingShifts}
                postUpdate={this.fetchPendingShifts}
            />
        );
    }
}


PendingReportContainer.propTypes = {};
PendingReportContainer.defaultProps = {};

const mapStateToProps = state => ({
    shifts: getPendingShifts(state),
});

const mapDispatchToProps = dispatch => ({
    // hasPendingShifts: () => dispatch( hasPendingShifts()) ,
    fetchPendingShifts: () => {
        dispatch(fetchPendingShifts());
    },
    deleteShift: (shift) => dispatch(showDeleteShiftModal(shift, dispatch)),
    updateShift: (shift, month, year) => dispatch(updateShift(shift, false, month, year)),
    showShiftDialog: (shift, callBack, postUpdate) => dispatch(showEditShiftModal(shift, callBack, postUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingReportContainer);
