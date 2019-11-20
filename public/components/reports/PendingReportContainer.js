import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import reduxForm from "redux-form/es/reduxForm";
import {fetchPendingShifts, showDeleteShiftModal, showEditShiftModal, updateShift} from "../../actions";
import {getPendingShifts} from "../../selectors";
import PendingReport from "./PendingReport";

class PendingReportContainer extends PureComponent {
    state = {

    };

    componentDidMount() {
        this.fetchPendingShifts();
    }

    fetchPendingShifts = () => {
        this.props.fetchPendingShifts();
    };

    render() {
        const {handleSubmit, updateShift, deleteShift, showShiftDialog, shifts, isLoading} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {})}>
                <PendingReport
                    shifts={shifts}
                    onDeleteShift={deleteShift}
                    onUpdateShift={updateShift}
                    showShiftDialog={showShiftDialog}
                    isLoading={isLoading}
                    postUpdate={this.fetchPendingShifts}
                />
            </form>
        );
    }
}


PendingReportContainer.propTypes = {};
PendingReportContainer.defaultProps = {};

function mapStateToProps(state) {
    return {
        shifts: getPendingShifts(state),
        initialValues: {
            shifts: getPendingShifts(state)
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // hasPendingShifts: () => dispatch( hasPendingShifts()) ,
        fetchPendingShifts: () => {dispatch( fetchPendingShifts()); },
        deleteShift: (shift) => dispatch(showDeleteShiftModal(shift, dispatch)),
        updateShift: (shift, month, year) => dispatch(updateShift(shift, dispatch, false, month, year)),
        showShiftDialog: (shift, callBack, postUpdate) => dispatch(showEditShiftModal(shift, callBack, postUpdate)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'pendingReportForm',
    enableReinitialize: true,
})(PendingReportContainer));
