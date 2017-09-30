import * as React from "react";
import {connect} from "react-redux";
import {createShift, deleteShift, updateShift} from "../../actions";
import {FieldArray, reduxForm} from "redux-form";
import MonthlyReport from "./MonthlyReport";
import PropTypes from 'prop-types';
import {fetchMonthlyReport} from "../../actions/shiftsActions";

class MonthlyReportContainer extends React.Component {

    componentDidMount() {
        this.props.fetchMonthlyReport();
    }

    render() {
        const {handleSubmit, updateShift, createShift, deleteShift} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <FieldArray name="employees" component={MonthlyReport} onDeleteShift={deleteShift} onUpdateShift={updateShift} onCreateShift={createShift} />
            </form>
        );
    }
}

MonthlyReportContainer.propTypes = {
    shifts: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    fetchMonthlyReport: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    updateShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        employees: state.shifts.report, // TODO don't know how to init that without those two... :-(
        initialValues: {
            employees: state.shifts.report
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMonthlyReport: () => {dispatch(fetchMonthlyReport("2017-09-01")); },
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
})(MonthlyReportContainer));
