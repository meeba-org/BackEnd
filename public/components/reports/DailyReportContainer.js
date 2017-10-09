import * as React from "react";
import {connect} from "react-redux";
import {createShift, deleteShift, updateShift} from "../../actions";
import {FieldArray, reduxForm} from "redux-form";
import MonthlyReport from "./MonthlyReport";
import PropTypes from 'prop-types';
import {fetchMonthlyReport} from "../../actions/shiftsActions";
import ShiftAnalyzer from "../../helpers/ShiftAnalyzer";
import DailyReport from "./DailyReport";

class DailyReportContainer extends React.Component {

    onStartDayOfMonthChange(startDateOfMonth) {
        if (!startDateOfMonth)
            return;

        this.props.fetchDailyReport(startDateOfMonth);
    }

    render() {
        const {handleSubmit, updateShift, createShift, deleteShift} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                    <FieldArray name="employees"
                                component={DailyReport}
                                onDeleteShift={deleteShift}
                                onUpdateShift={updateShift}
                                onCreateShift={createShift}
                                onStartDayOfMonthChange={(startDayOfMonth) => this.onStartDayOfMonthChange(startDayOfMonth)}
                    />
            </form>
        );
    }
}

DailyReportContainer.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    fetchMonthlyReport: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    updateShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const employees = ShiftAnalyzer.createReport(state.shifts);
    return {
        employees: employees, // TODO don't know how to init that without those two... :-(
        initialValues: {
            employees: employees
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDailyReport: (startDate) => {dispatch(fetchDailyReport(startDate)); },
        updateShift: (shift) => dispatch(updateShift(shift)),
        createShift: (shift) => dispatch(createShift(shift)),
        deleteShift: (shift) => dispatch(deleteShift(shift))
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'monthlyReportForm',
    enableReinitialize: true,
})(DailyReportContainer));
