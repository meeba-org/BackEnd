import React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import PropTypes from 'prop-types';
import {generateExcelReport} from "../../actions/shiftsActions";
import ExcelReport from "./ExcelReport";

class ExcelReportContainer extends React.Component {

    onDateChange(month, year) {
        if (!month || !year)
            return;

        this.props.generateExcelReport(month, year);
    }

    render() {
        return (
            <ExcelReport onGenerate={(month, year) => this.onDateChange(month, year)}/>
        );
    }
}

ExcelReportContainer.propTypes = {
    generateExcelReport: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
}

function mapDispatchToProps(dispatch) {
    return {
        generateExcelReport: (month, year) => dispatch(generateExcelReport(month, year)) ,
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'monthlyReportForm',
    enableReinitialize: true,
})(ExcelReportContainer));
