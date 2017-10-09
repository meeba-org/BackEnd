import * as React from "react";
import {connect} from "react-redux";
import {createShift, deleteShift, updateShift} from "../../actions";
import {reduxForm} from "redux-form";
import PropTypes from 'prop-types';
import {fetchDailyReport} from "../../actions/shiftsActions";
import DailyReport from "./DailyReport";

class DailyReportContainer extends React.Component {

    onDayChange(startDateOfMonth) {
        if (!startDateOfMonth)
            return;

        this.props.fetchDailyReport(startDateOfMonth);
    }

    render() {
        const {handleSubmit, updateShift, createShift, deleteShift} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <DailyReport
                    onDelete={deleteShift}
                    onUpdate={updateShift}
                    onCreate={createShift}
                    onDayChange={(startDayOfMonth) => this.onDayChange(startDayOfMonth)}
                />
            </form>
        );
    }
}

DailyReportContainer.propTypes = {
    shifts: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    fetchDailyReport: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    updateShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        shifts: state.shifts, // TODO don't know how to init that without those two... :-(
        initialValues: {
            shifts: state.shifts
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDailyReport: (startDate) => {dispatch( fetchDailyReport(startDate)); },
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
