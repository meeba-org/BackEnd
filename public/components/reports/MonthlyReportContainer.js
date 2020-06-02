import PropTypes from 'prop-types';
import React from "react";
import {connect} from "react-redux";
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
        return this.props.fetchMonthlyReport(month, year);
    };

    onExportReport(month, year) {
        const {exportReport, companySettings} = this.props;
        if (!month || !year)
            return;

        exportReport(month, year, companySettings);
    }

    render() {
            const {employeeShiftsReports, showShiftDialog, createShift, deleteShift, employees, userRole, isDesktop, startOfMonth, companySettings} = this.props;
        return (
            <MonthlyReport
                employees={employees}
                fields={employeeShiftsReports}
                onDeleteShift={deleteShift}
                showShiftDialog={showShiftDialog}
                onCreateShift={createShift}
                onMonthChange={this.onDataChange}
                onStartDayOfMonthChange={(month, year) => this.onStartDayOfMonthChange(month, year)}
                onExportReport={(month, year) => this.onExportReport(month, year)}
                userRole={userRole}
                postUpdate={this.onDataChange}
                ReportLineComponent={MonthlyReportLine}
                title={'דו"ח חודשי'}
                            isDesktop={isDesktop}
                            startOfMonth={startOfMonth}
                            defaultExportFormat={companySettings?.defaultExportFormat}
                />
        );
    }
}

MonthlyReportContainer.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
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
        employeeShiftsReports,
        userRole: getUserRole(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyReportContainer);
