import PropTypes from 'prop-types';
import React from "react";
import {connect} from "react-redux";
import reduxForm from "redux-form/es/reduxForm";
import {createShift, showLocationModal, updateShift} from "../../actions";
import {fetchDailyReport, showDeleteShiftModal, showEditShiftModal} from "../../actions/shiftsActions";
import {fetchUsers} from "../../actions/usersActions";

class DailyReportContainer extends React.PureComponent {

    onDayChange(startDateOfMonth) {
        if (!startDateOfMonth)
            return;

        this.props.fetchDailyReport(startDateOfMonth);
        this.props.fetchEmployees();
    }

    render() {
        const {handleSubmit, updateShift, createShift, deleteShift, showShiftDialog, showLocationModal, shifts, employees, router, isLoading} = this.props;

        return (
            <h1>Tasks Report</h1>
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
    showLocationModal: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        shifts: state.shifts,
        employees: state.users,
        initialValues: {
            shifts: state.shifts
        },
        isLoading: state.loader.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDailyReport: (startDate) => {dispatch( fetchDailyReport(startDate)); },
        fetchEmployees: () => dispatch(fetchUsers(true)),
        updateShift: (shift, month, year) => dispatch(updateShift(shift, dispatch, false, month, year)),
        createShift: (shift) => dispatch(createShift(shift, dispatch)),
        deleteShift: (shift) => dispatch(showDeleteShiftModal(shift, dispatch)),
        showShiftDialog: (shift, callBack) => dispatch(showEditShiftModal(shift, callBack)),
        showLocationModal: (shift, callBack) => dispatch(showLocationModal(shift, callBack)),
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'dailyReportForm',
    enableReinitialize: true,
})(DailyReportContainer));

