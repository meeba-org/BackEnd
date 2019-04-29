import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import reduxForm from "redux-form/es/reduxForm";
import {
    fetchPendingShifts,
    fetchUsers,
    showDeleteShiftModal,
    showEditShiftModal,
    showLocationModal,
    updateShift
} from "../../actions";
import {ReportModes} from "../../helpers/utils";
import PendingReport from "./PendingReport";

class PendingReportContainer extends PureComponent {
    state = {

    };

    componentDidMount() {
        this.props.fetchPendingShifts();
    }

    render() {
        const {handleSubmit, updateShift, deleteShift, showShiftDialog, showLocationModal, shifts, isLoading} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {})}>
                <PendingReport
                    shifts={shifts}
                    mode={ReportModes.Report}
                    onDeleteShift={deleteShift}
                    onUpdateShift={updateShift}
                    showShiftDialog={showShiftDialog}
                    showLocationModal={showLocationModal}
                    isLoading={isLoading}
                />
            </form>
        );
    }
}


PendingReportContainer.propTypes = {};
PendingReportContainer.defaultProps = {};

function mapStateToProps(state) {
    return {
        shifts: state.pendingShifts,
        initialValues: {
            shifts: state.pendingShifts
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPendingShifts: () => {dispatch( fetchPendingShifts()); },
        deleteShift: (shift) => dispatch(showDeleteShiftModal(shift, dispatch)),
        updateShift: (shift, month, year) => dispatch(updateShift(shift, dispatch, false, month, year)),
        showShiftDialog: (shift, callBack) => dispatch(showEditShiftModal(shift, callBack)),
        showLocationModal: (shift, callBack) => dispatch(showLocationModal(shift, callBack)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'pendingReportForm',
    enableReinitialize: true,
})(PendingReportContainer));
