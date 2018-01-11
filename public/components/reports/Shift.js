import React from "react";
import PropTypes from 'prop-types';
import {IconButton, TextField, Tooltip} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import WorkIcon from 'material-ui-icons/Work';
import HomeIcon from 'material-ui-icons/Home';
import styles from "../../styles/Shift.scss";
import CSSModules from "react-css-modules";
import {
    convertMomentToTimeStr,
    convertTimeStrToMoment,
    getCurrentTime,
    isWorking,
    momentToDay,
    ReportModes
} from "../../helpers/utils";
import moment from "moment";
import WarningIcon from "./WarningIcon";

class Shift extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            focus: false
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

    onShiftComplete = () => {
        let {startDateStr, startTimeStr} = convertMomentToTimeStr(this.props.input.value);
        let newEndTimeStr = getCurrentTime();

        this.onUpdate(startDateStr, startTimeStr, newEndTimeStr);
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    onFocus = () => {
        this.setState({focus: true});
        console.log('focus');
    };

    onBlur = () => {
        this.setState({focus: false});
        console.log('blur');
    };

    getErrors = () => {
        let {input} = this.props;
        let shift = input.value;

        let {clockInTime, clockOutTime} = shift;
        return moment(clockOutTime).diff(moment(clockInTime), 'hours', true) < 12 ? undefined : "משמרת ארוכה באופן מחשיד";
    };

    render() {
        let {showNames, input, mode} = this.props;
        let shift = input.value;
        let {startDateStr, startTimeStr, endTimeStr} = convertMomentToTimeStr(shift);
        let icon = isWorking(shift) ?
            <Tooltip title="בעבודה" placement="right"><WorkIcon/></Tooltip> :
            <Tooltip title="בבית" placement="right"><HomeIcon/></Tooltip>;
        let hebrewDay = momentToDay(shift.clockInTime);
        let errors = this.getErrors();
        let classes1 = "shift " + (this.state.focus ? "focus" : "");

        return (
            <div className={classes1} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
                onFocus={this.onFocus} onBlur={this.onBlur}>
                <div className="name-container">
                    {mode === ReportModes.Live &&
                        <IconButton className="icon">{icon}</IconButton>
                    }
                    {showNames &&
                    <div className="name">{shift.user && shift.user.firstName}</div>
                    }
                </div>

                {mode === ReportModes.Report &&
                <div>
                    <span>{hebrewDay}'</span>
                    <TextField className="elem" type="date" value={startDateStr} placeholder="תאריך"
                               onChange={(e) => this.onUpdateStartDate(e)}/>
                </div>
                }

                <TextField className="elem" type="time" value={startTimeStr} placeholder="כניסה"
                           onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}/>
                {(mode === ReportModes.Report || !!endTimeStr) &&

                <TextField className="elem" type="time" value={endTimeStr} placeholder="יציאה"
                           onChange={(e) => this.onUpdateEndTime(e, "clockOutTime")}/>
                }
                {errors &&
                    <div className="warning">
                        <WarningIcon  text={errors} />
                    </div>
                }
                {this.state.hover &&
                <div>
                    {mode === ReportModes.Live && isWorking(shift) &&
                    <Tooltip title="סיים משמרת" placement="left">
                        <IconButton className="elem" onClick={() => this.onShiftComplete()}><HomeIcon/></IconButton>
                    </Tooltip>
                    }
                    <Tooltip title="מחיקת משמרת" placement="left">
                        <IconButton className="elem" onClick={() => this.onDelete()}><DeleteIcon/></IconButton>
                    </Tooltip>
                </div>
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
