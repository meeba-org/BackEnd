import PropTypes from 'prop-types';
import React from "react";
import {connect} from "react-redux";
import FieldArray from "redux-form/es/FieldArray";
import reduxForm from "redux-form/es/reduxForm";
import {createShift} from "../../actions";
import {exportReport, fetchTasksReport} from "../../actions/reportsActions";
import {showDeleteShiftModal, showEditShiftModal} from "../../actions/shiftsActions";
import {fetchUsers} from "../../actions/usersActions";
import {getCompanySettings, getStartOfMonth, getUserRole} from "../../selectors";
import MonthlyReport from "./MonthlyReport";
import TaskReportLine from "./TaskReportLine";

class TasksReportContainer extends React.PureComponent {

    componentDidMount() {
        this.props.fetchEmployees();
    }

    onStartDayOfMonthChange(month, year) {
        if (!month || !year)
            return;

        this.props.fetchTasksReport(month, year);
    }

    onDataChange = (month, year) => {
        this.props.fetchTasksReport(month, year);
    };

    onExportReport(month, year) {
        const {exportReport, companySettings} = this.props;
        if (!month || !year)
            return;

        exportReport(month, year, companySettings);
    }

    render() {
        const {handleSubmit, showShiftDialog, createShift, deleteShift, employees, userRole, startOfMonth} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <FieldArray name="tasksReports"
                            component={MonthlyReport}
                            employees={employees}
                            onDeleteShift={deleteShift}
                            showShiftDialog={showShiftDialog}
                            onCreateShift={createShift}
                            onMonthChange={this.onDataChange}
                            onStartDayOfMonthChange={(month, year) => this.onStartDayOfMonthChange(month, year)}
                            onExportReport={(month, year) => this.onExportReport(month, year)}
                            userRole={userRole}
                            reportLineComponent={TaskReportLine}
                            title={'דו"ח משימות'}
                            postUpdate={this.onDataChange}
                            startOfMonth={startOfMonth}
                />
            </form>
        );
    }
}

TasksReportContainer.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
    route: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    fetchTasksReport: PropTypes.func.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    updateShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    employees: state.users,
    initialValues: {
        tasksReports: state.reports.tasksReports
    },
    userRole: getUserRole(state),
    isLoading: state.loader.isLoading,
    startOfMonth: getStartOfMonth(state),
    companySettings: getCompanySettings(state)
});

const mapDispatchToProps = {
    fetchTasksReport,
    fetchEmployees: fetchUsers,
    exportReport,
    createShift,
    deleteShift: showDeleteShiftModal,
    showShiftDialog: showEditShiftModal,
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'taskReportForm',
    enableReinitialize: true,
})(TasksReportContainer));

