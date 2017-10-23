import * as React from "react";
import PropTypes from 'prop-types';
import {IconButton, TextField} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import moment from "moment";
import styles from "../../styles/Shift.scss";
import CSSModules from "react-css-modules";
import {convertTimeStrToMoment, DATE_FORMAT, TIME_FORMAT} from "../../helpers/utils";

class Shift extends React.Component {

    onUpdateStartDate(e) {
        let {startTimeStr, endTimeStr} = this.extractShiftInfo();
        let newStartDateStr = e.target.value;

        this.onUpdate(newStartDateStr, startTimeStr, endTimeStr);
    }

    onUpdateStartTime(e) {
        let {startDateStr, endTimeStr} = this.extractShiftInfo();
        let newStartTimeStr = e.target.value;

        this.onUpdate(startDateStr, newStartTimeStr, endTimeStr);
    }

    onUpdateEndTime(e) {
        let {startDateStr, startTimeStr} = this.extractShiftInfo();
        let newEndTimeStr = e.target.value;

        this.onUpdate(startDateStr, startTimeStr, newEndTimeStr);
    }

    onUpdate(startDateStr, startTimeStr, endTimeStr) {
        let {input, onUpdate} = this.props;

        let {momentStart, momentEnd} = convertTimeStrToMoment(startDateStr, startTimeStr, endTimeStr);

        let shift = {
            ...input.value,
            clockInTime: momentStart,
            clockOutTime: momentEnd,
        };

        input.onChange(shift);
        onUpdate(shift);
    }

    onDelete() {
        let {onDelete, input} = this.props;

        onDelete(input.value);
    }

    extractShiftInfo() {
        let {clockInTime, clockOutTime} = this.props.input.value;
        let startDateStr = moment(clockInTime).format(DATE_FORMAT);
        let startTimeStr = moment(clockInTime).format(TIME_FORMAT);
        let endTimeStr = moment(clockOutTime).format(TIME_FORMAT);
        return {startDateStr, startTimeStr, endTimeStr};
    }

    render() {
        let {showNames, input} = this.props;
        let {startDateStr, startTimeStr, endTimeStr} = this.extractShiftInfo();

        return (
            <div className="shift">
                {showNames &&
                input.value.user.firstName
                }
                <TextField className="elem" type="date" value={startDateStr} placeholder="תאריך"
                           onChange={(e) => this.onUpdateStartDate(e)}/>
                <TextField className="elem" type="time" value={startTimeStr} placeholder="כניסה"
                           onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}/>
                <TextField className="elem" type="time" value={endTimeStr} placeholder="יציאה"
                           onChange={(e) => this.onUpdateEndTime(e, "clockOutTime")}/>
                <IconButton className="elem" onClick={() => this.onDelete()}><DeleteIcon/></IconButton>
            </div>
        );
    }
}

Shift.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showNames: PropTypes.bool
};

export default CSSModules(Shift, styles);
