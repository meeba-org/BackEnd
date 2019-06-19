import React, {Component} from 'react';
import {convertMomentToTimeStr, convertTimeStrToMoment, getCurrentTime} from "../helpers/utils";

function withShiftLogic(WrappedComponent) {
    class WithShiftLogic extends Component {
        onUpdateStartDate = (date, shift) => {
            let {startTimeStr, endTimeStr} = convertMomentToTimeStr(shift);
            let newStartDateStr = date.format("YYYY-MM-DD");

            return this.onUpdate(shift, newStartDateStr, startTimeStr, endTimeStr);
        };

        onDraftUpdateStartDate = (date, shift) => {
            let {startTimeStr, endTimeStr} = convertMomentToTimeStr(shift.draftShift);
            let newStartDateStr = date.format("YYYY-MM-DD");

            return this.onDraftUpdate(shift, newStartDateStr, startTimeStr, endTimeStr);
        };

        onUpdateStartTime = (time, shift) => {
            let {startDateStr, endTimeStr} = convertMomentToTimeStr(shift);
            let newStartTimeStr = time.format("HH:mm");

            return this.onUpdate(shift, startDateStr, newStartTimeStr, endTimeStr);
        };

        onDraftUpdateStartTime = (time, shift) => {
            let {startDateStr, endTimeStr} = convertMomentToTimeStr(shift.draftShift);
            let newStartTimeStr = time.format("HH:mm");

            return this.onDraftUpdate(shift, startDateStr, newStartTimeStr, endTimeStr);
        };

        onUpdateEndTime = (time, shift) => {
            let {startDateStr, startTimeStr} = convertMomentToTimeStr(shift);
            let newEndTimeStr = time.format("HH:mm");

            return this.onUpdate(shift, startDateStr, startTimeStr, newEndTimeStr);
        };

        onDraftUpdateEndTime = (time, shift) => {
            let {startDateStr, startTimeStr} = convertMomentToTimeStr(shift.draftShift);
            let newEndTimeStr = time.format("HH:mm");

            return this.onDraftUpdate(shift, startDateStr, startTimeStr, newEndTimeStr);
        };

        onDraftUpdate = (orgShift, startDateStr, startTimeStr, endTimeStr) => {
            let {momentStart, momentEnd} = convertTimeStrToMoment(startDateStr, startTimeStr, endTimeStr);

            let updatedShift = {
                ...orgShift,
                draftShift: {
                    ...orgShift.draftShift,
                    clockInTime: momentStart,
                    clockOutTime: momentEnd,
                }
            };

            return updatedShift;
        };

        onUpdate = (orgShift, startDateStr, startTimeStr, endTimeStr) => {
            let {momentStart, momentEnd} = convertTimeStrToMoment(startDateStr, startTimeStr, endTimeStr);

            let updatedShift = {
                ...orgShift,
                clockInTime: momentStart,
                clockOutTime: momentEnd,
            };

            return updatedShift;
        };

        onShiftComplete = (shift) => {
            let {startDateStr, startTimeStr} = convertMomentToTimeStr(shift);
            let newEndTimeStr = getCurrentTime();

            return this.onUpdate(shift, startDateStr, startTimeStr, newEndTimeStr);
        };

        render() {
            const { ...otherProps } = this.props;

            return (<WrappedComponent
                onUpdateStartDate={this.onUpdateStartDate}
                onUpdateStartTime={this.onUpdateStartTime}
                onUpdateEndTime={this.onUpdateEndTime}
                onShiftComplete={this.onShiftComplete}
                onDraftUpdateStartDate={this.onDraftUpdateStartDate}
                onDraftUpdateStartTime={this.onDraftUpdateStartTime}
                onDraftUpdateEndTime={this.onDraftUpdateEndTime}

                {...otherProps}
            />);
        }
    }

    return WithShiftLogic;
}

export default withShiftLogic;
