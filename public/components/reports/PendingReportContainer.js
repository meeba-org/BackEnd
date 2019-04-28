import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    fetchDailyReport,
    fetchUsers, showDeleteShiftModal,
    showEditShiftModal,
    showLocationModal,
    updateShift
} from "../../actions";
import {ReportModes} from "../../helpers/utils";
import PendingReport from "./PendingReport";
import reduxForm from "redux-form/es/reduxForm";

class PendingReportContainer extends PureComponent {
    state = {

    };

    componentDidMount() {
        this.props.fetchDailyReport("2019-04-12");
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
        shifts: state.shifts,
        initialValues: {
            shifts: state.shifts
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDailyReport: (startDate) => {dispatch( fetchDailyReport(startDate)); },
        fetchEmployees: () => dispatch(fetchUsers(true)),
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
