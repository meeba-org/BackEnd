import * as React from "react";
import PropTypes from 'prop-types';
import {IconButton, TextField} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import WorkIcon from 'material-ui-icons/Work';
import HomeIcon from 'material-ui-icons/Home';
import styles from "../../styles/LiveShift.scss";
import CSSModules from "react-css-modules";
import {convertMomentToTimeStr, convertTimeStrToMoment, isWorking} from "../../helpers/utils";

class LiveShift extends React.Component {

    onUpdateStartTime(e) {
        let {startDateStr, endTimeStr} = convertMomentToTimeStr(this.props.input.value);
        let newStartTimeStr = e.target.value;

        this.onUpdate(startDateStr, newStartTimeStr, endTimeStr);
    }

    onUpdateEndTime(e) {
        let {startDateStr, startTimeStr} = convertMomentToTimeStr(this.props.input.value);
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

    render() {
        let {showNames, input} = this.props;
        let shift = input.value;
        let {startTimeStr, endTimeStr} = convertMomentToTimeStr(shift);
        let icon = isWorking(shift) ? <WorkIcon/> : <HomeIcon/>;

        return (
            <div className="shift">
                <div className="name-container">
                <IconButton>{icon}</IconButton>
                {showNames &&
                    <span className="name">{shift.user.firstName}</span>
                }
                </div>
                <TextField className="elem" type="time" value={startTimeStr} placeholder="כניסה"
                           onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}/>
                { endTimeStr !== null &&
                    <TextField className="elem" type="time" value={endTimeStr} placeholder="יציאה"
                               onChange={(e) => this.onUpdateEndTime(e, "clockOutTime")}/>
                }
                <IconButton className="elem" onClick={() => this.onDelete()}><DeleteIcon/></IconButton>
            </div>
        );
    }
}

LiveShift.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showNames: PropTypes.bool
};

export default CSSModules(LiveShift, styles);
