import moment from "moment";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {createShift, showDeleteShiftModal, updateShift} from "../actions";
import {convertMomentToTimeStr, convertTimeStrToMoment, getCurrentTime} from "../helpers/utils";

function withShiftLogic(WrappedComponent) {
    class WithShiftLogic extends Component {
        onUpdateStartDate = (date, shift) => {
            let {startTimeStr, endTimeStr} = convertMomentToTimeStr(shift);
            let newStartDateStr = date.format("YYYY-MM-DD");

            return this.onUpdate(shift, newStartDateStr, startTimeStr, endTimeStr);
        };

        onUpdateStartTime = (time, shift) => {
            let {startDateStr, endTimeStr} = convertMomentToTimeStr(shift);
            let newStartTimeStr = time.format("HH:mm");

            return this.onUpdate(shift, startDateStr, newStartTimeStr, endTimeStr);
        };

        onUpdateEndTime = (time, shift) => {
            let {startDateStr, startTimeStr} = convertMomentToTimeStr(shift);
            let newEndTimeStr = time.format("HH:mm");

            return this.onUpdate(shift, startDateStr, startTimeStr, newEndTimeStr);
        };

        onUpdate = (orgShift, startDateStr, startTimeStr, endTimeStr) => {
            let {updateShift} = this.props;

            let {momentStart, momentEnd} = convertTimeStrToMoment(startDateStr, startTimeStr, endTimeStr);


            let updatedShift = {
                ...orgShift,
                clockInTime: momentStart,
                clockOutTime: momentEnd,
            };

            let mShift = moment(orgShift.clockInTime); // Passing the original month & year
            updateShift(updatedShift, mShift.format('MM'), mShift.format('YYYY'));
            return updatedShift;
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
