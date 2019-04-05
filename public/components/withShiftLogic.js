import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {convertMomentToTimeStr, convertTimeStrToMoment, getCurrentTime} from "../helpers/utils";

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
            let {shift, onUpdate} = this.props;

            let {momentStart, momentEnd} = convertTimeStrToMoment(startDateStr, startTimeStr, endTimeStr);

            let updatedShift = {
                ...shift,
                clockInTime: momentStart,
                clockOutTime: momentEnd,
            };

            onUpdate(updatedShift);
        };

        onDelete = () => {
            let {onDelete, shift} = this.props;

            onDelete(shift);
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

    return WithShiftLogic;
}

export default withShiftLogic;
