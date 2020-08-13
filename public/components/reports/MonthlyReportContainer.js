import React, {useEffect} from "react";
import {connect} from "react-redux";
import {exportReport, fetchMonthlyReport} from "../../actions/reportsActions";
import {createShift, showDeleteShiftModal, showEditShiftModal} from "../../actions/shiftsActions";
import {fetchUsers} from "../../actions/usersActions";
import {getCompanySettings, getEmployeesMonthlyReports, getStartOfMonth, getUserRole, isDesktop, isInnovativeAuthorityEnable} from "../../selectors";
import MonthlyReport from "./MonthlyReport";
import MonthlyReportLine from "./MonthlyReportLine";

const MonthlyReportContainer = ({employeeShiftsReports, showShiftDialog, createShift, deleteShift, employees, userRole, isDesktop, startOfMonth, exportReport, companySettings, 
                                    isInnovativeAuthorityEnable, fetchEmployees, fetchMonthlyReport}) => {
    
    useEffect(() => {
        fetchEmployees();
    }, []);

    const onStartDayOfMonthChange = (month, year) => {
        if (!month || !year)
            return;

        fetchMonthlyReport(month, year);
    };
    
    const onDataChange = (month, year) => {
        return fetchMonthlyReport(month, year);
    };

    const onExportReport = (month, year, format) => {
        if (!month || !year)
            return;

        exportReport(month, year, companySettings, format);
    };

    const calcTotalHours = employeeShiftsReports => {
        if (!employeeShiftsReports)
            return 0;
        
        let totalHours = 0;
        for (const report of employeeShiftsReports) {
            const {regularHours, extra125Hours, extra150Hours, extra175Hours, extra200Hours} = report;
            
            let total = (parseFloat(regularHours) + parseFloat(extra125Hours) + parseFloat(extra150Hours) + parseFloat(extra175Hours) + parseFloat(extra200Hours));
            totalHours += total;
        }
        
        return totalHours;
    };

    const calcSummary = () => {
        const totalHours = calcTotalHours(employeeShiftsReports);
        return {
            totalHours,
            employeesCount: employees.length
        };
    };

    const summary = calcSummary();
    
    return (
        <MonthlyReport
            summary={summary}
            employees={employees}
            employeeShiftsReports={employeeShiftsReports}
            onDeleteShift={deleteShift}
            showShiftDialog={showShiftDialog}
            onCreateShift={createShift}
            onMonthChange={onDataChange}
            onStartDayOfMonthChange={onStartDayOfMonthChange}
            onExportReport={onExportReport}
            userRole={userRole}
            postUpdate={onDataChange}
            ReportLineComponent={MonthlyReportLine}
            title={'דו"ח חודשי'}
            isDesktop={isDesktop}
            startOfMonth={startOfMonth}
            defaultExportFormat={companySettings?.defaultExportFormat}
            isInnovativeAuthorityEnable={isInnovativeAuthorityEnable}
        />
    );
};

const mapStateToProps = state => ({
    employees: state.users,
    employeeShiftsReports: getEmployeesMonthlyReports(state),
    userRole: getUserRole(state),
    isDesktop: isDesktop(state),
    startOfMonth: getStartOfMonth(state),
    companySettings: getCompanySettings(state),
    isInnovativeAuthorityEnable: isInnovativeAuthorityEnable(state)
});

const mapDispatchToProps = {
    fetchMonthlyReport,
    fetchEmployees: fetchUsers,
    exportReport,
    createShift,
    deleteShift: showDeleteShiftModal,
    showShiftDialog: showEditShiftModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyReportContainer);
