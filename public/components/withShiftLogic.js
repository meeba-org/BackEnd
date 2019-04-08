import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {createShift, showDeleteShiftModal, updateShift} from "../actions";
import {convertMomentToTimeStr, convertTimeStrToMoment, getCurrentTime} from "../helpers/utils";
import moment from "./reports/MonthlyReport";

function withShiftLogic(WrappedComponent) {
    class WithShiftLogic extends Component {
        onUpdateStartDate = (date, shift) => {
            let {startTimeStr, endTimeStr} = convertMomentToTimeStr(shift);
            let newStartDateStr = date.format("YYYY-MM-DD");

            this.onUpdate(newStartDateStr, startTimeStr, endTimeStr);
        };

        onUpdateStartTime = (time, shift) => {
            let {startDateStr, endTimeStr} = convertMomentToTimeStr(shift);
            let newStartTimeStr = time.format("HH:mm");

            this.onUpdate(startDateStr, newStartTimeStr, endTimeStr);
        };

        onUpdateEndTime = (time, shift) => {
            let {startDateStr, startTimeStr} = convertMomentToTimeStr(shift);
            let newEndTimeStr = time.format("HH:mm");

            this.onUpdate(startDateStr, startTimeStr, newEndTimeStr);
        };

        onUpdate = (startDateStr, startTimeStr, endTimeStr) => {
            let {shift, updateShift} = this.props;

            let {momentStart, momentEnd} = convertTimeStrToMoment(startDateStr, startTimeStr, endTimeStr);

            let updatedShift = {
                ...shift,
                clockInTime: momentStart,
                clockOutTime: momentEnd,
            };

            const {selectedYear, selectedMonth} = this.props; // TODO Chen need to be drilled ...

            let value = moment().year(selectedYear).month(selectedMonth - 1);
            updateShift(updatedShift, value.format('MM'), value.format('YYYY'));
        };

        onDelete = () => {
            let {deleteShift, shift} = this.props;

            deleteShift(shift);
        };

        onShiftComplete = () => {
            let {startDateStr, startTimeStr} = convertMomentToTimeStr(this.props.shift);
            let newEndTimeStr = getCurrentTime();

            this.onUpdate(startDateStr, startTimeStr, newEndTimeStr);
        };

        render() {
            const { ...otherProps } = this.props;

            return (<WrappedComponent
                onUpdateStartDate={this.onUpdateStartDate}
                onUpdateStartTime={this.onUpdateStartTime}
                onUpdateEndTime={this.onUpdateEndTime}
                onDelete={this.onDelete}
                onShiftComplete={this.onShiftComplete}
                {...otherProps}
            />);
        }
    }

    WithShiftLogic.propTypes = {
        onDelete: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
    };

    function mapDispatchToProps(dispatch) {
        return {
            createShift: (shift) => dispatch(createShift(shift, dispatch)),
            updateShift: (shift, month, year) => dispatch(updateShift(shift, dispatch, true, month, year)),
            deleteShift: (shift, month, year) => dispatch(showDeleteShiftModal(shift, dispatch, month, year)),
        };
    }

    return connect(null, mapDispatchToProps)(WithShiftLogic);
}

export default withShiftLogic;
