import React from "react";
import {connect} from "react-redux";
import {createShift, updateShift} from "../../actions";
import reduxForm from "redux-form/es/reduxForm";
import PropTypes from 'prop-types';
import {fetchDailyReport, showDeleteShiftModal, showEditShiftModal} from "../../actions/shiftsActions";
import DailyReport from "./DailyReport";
import {fetchUsers} from "../../actions/usersActions";

class DailyReportContainer extends React.PureComponent {

    onDayChange(startDateOfMonth) {
        if (!startDateOfMonth)
            return;

        this.props.fetchDailyReport(startDateOfMonth);
        this.props.fetchEmployees();
    }

    render() {
        const {handleSubmit, updateShift, createShift, deleteShift, showShiftDialog, shifts, employees, router, isLoading} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {})}>
                <DailyReport
                    shifts={shifts}
                    mode={this.props.route.mode}
                    employees={employees}
                    onDeleteShift={deleteShift}
                    onUpdateShift={updateShift}
                    onCreateShift={createShift}
                    showShiftDialog={showShiftDialog}
                    onDayChange={(startDayOfMonth) => this.onDayChange(startDayOfMonth)}
                    router={router}
                    isLoading={isLoading}
                />
            </form>
        );
    }
}

DailyReportContainer.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
    route: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    fetchDailyReport: PropTypes.func.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    updateShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        shifts: state.shifts,
        employees: state.users,
        initialValues: {
            shifts: state.shifts
        },
        isLoading: state.loader.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDailyReport: (startDate) => {dispatch( fetchDailyReport(startDate)); },
        fetchEmployees: () => dispatch(fetchUsers(true)),
        updateShift: (shift, month, year) => dispatch(updateShift(shift, dispatch, false, month, year)),
        createShift: (shift) => dispatch(createShift(shift, dispatch)),
        deleteShift: (shift) => dispatch(showDeleteShiftModal(shift, dispatch)),
        showShiftDialog: (shift, callBack) => dispatch(showEditShiftModal(shift, callBack)),
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'dailyReportForm',
    enableReinitialize: true,
})(DailyReportContainer));

