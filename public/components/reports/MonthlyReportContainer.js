import React from "react";
import {connect} from "react-redux";
import {FieldArray, reduxForm} from "redux-form";
import MonthlyReport from "./MonthlyReport";
import PropTypes from 'prop-types';
import {createShift, updateShift, fetchMonthlyReport, generateExcelReport, showDeleteShiftModal} from "../../actions/shiftsActions";
import {fetchUsers} from "../../actions/usersActions";
import {createEmployeeShiftsReports} from "../../helpers/ShiftAnalyzer";
import * as selectors from "../../selectors";

class MonthlyReportContainer extends React.Component {

    onStartDayOfMonthChange(startDateOfMonth) {
        if (!startDateOfMonth)
            return;

        this.props.fetchMonthlyReport(startDateOfMonth);
        this.props.fetchEmployees();
    }

    onGenerateExcel(month, year) {
        if (!month || !year)
            return;

        this.props.generateExcelReport(month, year);
    }

    render() {
        const {handleSubmit, updateShift, createShift, deleteShift, employees, userRole} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <FieldArray name="employeeShiftsReports"
                            component={MonthlyReport}
                            employees={employees}
                            onDeleteShift={deleteShift}
                            onUpdateShift={updateShift}
                            onCreateShift={createShift}
                            onStartDayOfMonthChange={(startDayOfMonth) => this.onStartDayOfMonthChange(startDayOfMonth)}
                            onGenerateExcel={(month, year) => this.onGenerateExcel(month, year)}
                            userRole={userRole}
                />
            </form>
        );
    }
}

MonthlyReportContainer.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    fetchMonthlyReport: PropTypes.func.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    generateExcelReport: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    updateShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
    userRole: PropTypes.string,
};

function mapStateToProps(state) {
    const employeeShiftsReports = createEmployeeShiftsReports(state.shifts);
    const employees = state.users;
    return {
        employees,
        userRole: selectors.getUserRole(state),
        initialValues: {
            employeeShiftsReports,
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMonthlyReport: (startDate) => dispatch(fetchMonthlyReport(startDate)) ,
        fetchEmployees: () => dispatch(fetchUsers()),
        generateExcelReport: (month, year) => dispatch(generateExcelReport(month, year)),
        updateShift: (shift) => dispatch(updateShift(shift)),
        createShift: (shift) => dispatch(createShift(shift)),
        deleteShift: (shift) => dispatch(showDeleteShiftModal(shift))
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'monthlyReportForm',
    enableReinitialize: true,
})(MonthlyReportContainer));
