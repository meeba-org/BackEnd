import PropTypes from 'prop-types';
import React from "react";
import {connect} from "react-redux";
import FieldArray from "redux-form/es/FieldArray";
import reduxForm from "redux-form/es/reduxForm";
import {createShift, showLocationModal} from "../../actions";
import {fetchTasksReport, generateExcelReport} from "../../actions/reportsActions";
import {showDeleteShiftModal, showEditShiftModal} from "../../actions/shiftsActions";
import {fetchUsers} from "../../actions/usersActions";
import * as selectors from "../../selectors";
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

    onGenerateExcel(month, year) {
        if (!month || !year)
            return;

        this.props.generateExcelReport(month, year);
    }

    render() {
        const {handleSubmit, showShiftDialog, showLocationModal, createShift, deleteShift, employees, userRole} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <FieldArray name="tasksReports"
                            component={MonthlyReport}
                            employees={employees}
                            onDeleteShift={deleteShift}
                            showShiftDialog={showShiftDialog}
                            showLocationModal={showLocationModal}
                            onCreateShift={createShift}
                            onMonthChange={this.onDataChange}
                            onStartDayOfMonthChange={(month, year) => this.onStartDayOfMonthChange(month, year)}
                            onGenerateExcel={(month, year) => this.onGenerateExcel(month, year)}
                            userRole={userRole}
                            reportLineComponent={TaskReportLine}
                            title={'דו"ח משימות'}
                            postUpdate={this.onDataChange}
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
    showLocationModal: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        employees: state.users,
        initialValues: {
            tasksReports: state.reports.tasksReports
        },
        userRole: selectors.getUserRole(state),
        isLoading: state.loader.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasksReport: (month, year) => dispatch(fetchTasksReport(month, year)),
        fetchEmployees: () => dispatch(fetchUsers(true)),
        generateExcelReport: (month, year) => dispatch(generateExcelReport(month, year)),
        createShift: (shift, month, year) => dispatch(createShift(shift, dispatch, month, year)),
        deleteShift: (shift, month, year) => dispatch(showDeleteShiftModal(shift, dispatch, month, year)),
        showShiftDialog: (shift, callBack, postUpdate) => dispatch(showEditShiftModal(shift, callBack, postUpdate)),
        showLocationModal: (shift, callBack) => dispatch(showLocationModal(shift, callBack)),
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'taskReportForm',
    enableReinitialize: true,
})(TasksReportContainer));

