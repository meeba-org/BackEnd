import * as React from "react";
import {connect} from "react-redux";
import {createShift, deleteShift, updateShift} from "../../actions";
import {reduxForm} from "redux-form";
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
                    <MonthlyReport onDelete={deleteShift} onUpdate={updateShift} onCreate={createShift} />
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
        employees: state.data.employees, // TODO dont know how to init that without hose two... :-(
        initialValues: {
            employees: state.data.employees
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMonthlyReport: () => {dispatch(fetchMonthlyReport());},
        updateShift: (employee) => {
            dispatch(updateShift(employee));
        },
        createShift: (employee) => {
            dispatch(createShift(employee));
        },
        deleteShift: (employee) => {
            dispatch(deleteShift(employee));
        },
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'monthlyReportForm',
    enableReinitialize: true,
})(MonthlyReportContainer));
