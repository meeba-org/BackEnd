import * as React from "react";
import PropTypes from 'prop-types';
import {IconButton, TextField} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import WorkIcon from 'material-ui-icons/Work';
import HomeIcon from 'material-ui-icons/Home';
import styles from "../../styles/Shift.scss";
import CSSModules from "react-css-modules";
import {convertMomentToTimeStr, convertTimeStrToMoment, isWorking, ReportModes} from "../../helpers/utils";

class Shift extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };
    }

    onUpdateStartDate(e) {
        let {startTimeStr, endTimeStr} = convertMomentToTimeStr(this.props.input.value);
        let newStartDateStr = e.target.value;

        this.onUpdate(newStartDateStr, startTimeStr, endTimeStr);
    }

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

    onMouseEnter = (e) => {
        this.setState({hover: true});
    };

    onMouseLeave = (e) => {
        this.setState({hover: false});
    };

    render() {
        let {showNames, input, mode} = this.props;
        let shift = input.value;
        let {startDateStr, startTimeStr, endTimeStr} = convertMomentToTimeStr(shift);
        let icon = isWorking(shift) ? <WorkIcon/> : <HomeIcon/>;

        return (
            <div className="shift" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div className="name-container">
                    {mode == ReportModes.Live &&
                        <IconButton>{icon}</IconButton>
                    }
                    {showNames &&
                    <span className="name">{shift.user.firstName}</span>
                    }
                </div>

                {mode == ReportModes.Report &&
                <TextField className="elem" type="date" value={startDateStr} placeholder="תאריך"
                           onChange={(e) => this.onUpdateStartDate(e)}/>
                }

                <TextField className="elem" type="time" value={startTimeStr} placeholder="כניסה"
                           onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}/>

                {(mode == ReportModes.Report || endTimeStr !== null) &&
                <TextField className="elem" type="time" value={endTimeStr} placeholder="יציאה"
                           onChange={(e) => this.onUpdateEndTime(e, "clockOutTime")}/>
                }

                {this.state.hover &&
                <IconButton className="elem" onClick={() => this.onDelete()}><DeleteIcon/></IconButton>
                }
            </div>
        );
    }
}

Shift.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    mode: PropTypes.number.isRequired,
};

export default CSSModules(Shift, styles);
