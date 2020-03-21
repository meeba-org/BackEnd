import React from "react";
import {connect} from "react-redux";
import {createShift, updateShift} from "../../actions";
import reduxForm from "redux-form/es/reduxForm";
import PropTypes from 'prop-types';
import {fetchDailyReport, showDeleteShiftModal, showEditShiftModal} from "../../actions/shiftsActions";
import {getDailyShifts} from "../../selectors";
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
        const {handleSubmit, updateShift, createShift, deleteShift, showShiftDialog, shifts, employees, isLoading, mode} = this.props;

        return (
            <form onSubmit={handleSubmit(() => {})}>
                <DailyReport
                    shifts={shifts}
                    mode={mode}
                    employees={employees}
                    onDeleteShift={deleteShift}
                    onUpdateShift={updateShift}
                    onCreateShift={createShift}
                    showShiftDialog={showShiftDialog}
                    onDayChange={(startDayOfMonth) => this.onDayChange(startDayOfMonth)}
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
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        shifts: getDailyShifts(state),
        employees: state.users,
        initialValues: {
            shifts: getDailyShifts(state)
        },
        isLoading: state.loader.isLoading
    };
}

const mapDispatchToProps = {
    fetchDailyReport,
    fetchEmployees: fetchUsers,
    updateShift: (shift, month, year) => updateShift(shift, false, month, year),
    createShift,
    deleteShift: showDeleteShiftModal,
    showShiftDialog: showEditShiftModal,
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'dailyReportForm',
    enableReinitialize: true,
})(DailyReportContainer));

