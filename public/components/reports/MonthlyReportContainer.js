import PropTypes from 'prop-types';
import React from "react";
import {connect} from "react-redux";
import FieldArray from "redux-form/es/FieldArray";
import reduxForm from "redux-form/es/reduxForm";
import {exportReport, fetchMonthlyReport} from "../../actions/reportsActions";
import {createShift, showDeleteShiftModal, showEditShiftModal} from "../../actions/shiftsActions";
import {fetchUsers} from "../../actions/usersActions";
import {getCompanySettings, getMonthlyReport, getStartOfMonth, getUserRole, isDesktop} from "../../selectors";
import MonthlyReport from "./MonthlyReport";
import MonthlyReportLine from "./MonthlyReportLine";

class MonthlyReportContainer extends React.PureComponent {

    componentDidMount() {
        this.props.fetchEmployees();
    }

    onStartDayOfMonthChange(month, year) {
        if (!month || !year)
            return;

        this.props.fetchMonthlyReport(month, year);
    }

    onDataChange = (month, year) => {
        this.props.fetchMonthlyReport(month, year);
    };

    onExportReport(month, year) {
        const {exportReport, companySettings} = this.props;
        if (!month || !year)
            return;

        exportReport(month, year, companySettings);
    }

    render() {
            const {handleSubmit, showShiftDialog, createShift, deleteShift, employees, userRole, isDesktop, startOfMonth} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <FieldArray name="employeeShiftsReports"
                            component={MonthlyReport}
                            employees={employees}
                            onDeleteShift={deleteShift}
                            showShiftDialog={showShiftDialog}
                            onCreateShift={createShift}
                            onMonthChange={this.onDataChange}
                            onStartDayOfMonthChange={(month, year) => this.onStartDayOfMonthChange(month, year)}
                            onExportReport={(month, year) => this.onExportReport(month, year)}
                            userRole={userRole}
                            postUpdate={this.onDataChange}
                            reportLineComponent={MonthlyReportLine}
                            title={'דו"ח חודשי'}
                            isDesktop={isDesktop}
                            startOfMonth={startOfMonth}
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
    exportReport: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    isDesktop: PropTypes.bool
};

function mapStateToProps(state) {
    const employeeShiftsReports = getMonthlyReport(state);
    const employees = state.users;
    return {
        employees,
        userRole: getUserRole(state),
        initialValues: {
            employeeShiftsReports,
        },
        isDesktop: isDesktop(state),
        startOfMonth: getStartOfMonth(state),
        companySettings: getCompanySettings(state)
    };
}

const mapDispatchToProps = {
    fetchMonthlyReport,
    fetchEmployees: fetchUsers,
    exportReport,
    createShift,
    deleteShift: showDeleteShiftModal,
    showShiftDialog: showEditShiftModal,
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'monthlyReportForm',
    enableReinitialize: true,
})(MonthlyReportContainer));
