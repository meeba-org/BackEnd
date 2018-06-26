import React from "react";
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from '@material-ui/icons/Delete';
import Home from '@material-ui/icons/Home';
import Work from '@material-ui/icons/Work';
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
import {DatePicker, TimePicker} from "material-ui-pickers";
import styles from "../../styles/Shift.scss";

class Shift extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            focus: false,
        };
    }

    onUpdateStartDate(date) {
        let {startTimeStr, endTimeStr} = convertMomentToTimeStr(this.props.input.value);
        let newStartDateStr = date.format("YYYY-MM-DD");

        this.onUpdate(newStartDateStr, startTimeStr, endTimeStr);
    }

    onUpdateStartTime(time) {
        let {startDateStr, endTimeStr} = convertMomentToTimeStr(this.props.input.value);
        let newStartTimeStr = time.format("HH:mm");

        this.onUpdate(startDateStr, newStartTimeStr, endTimeStr);
    }

    onUpdateEndTime(time) {
        let {startDateStr, startTimeStr} = convertMomentToTimeStr(this.props.input.value);
        let newEndTimeStr = time.format("HH:mm");

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

        onUpdate(shift, input);
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
    };

    onBlur = () => {
        this.setState({focus: false});
    };

    getErrors = () => {
        let {input} = this.props;
        let shift = input.value;
        let {clockInTime, clockOutTime} = shift;
        let isShiftTooLong = moment(clockOutTime).diff(moment(clockInTime), 'hours', true) > 12;
        if (isShiftTooLong) {
            let clockInTimeStr = moment(clockInTime).format('DD/MM/YYYY HH:mm');
            let clockOutTimeStr = moment(clockOutTime).format('DD/MM/YYYY HH:mm');
            return "משמרת מעל 12 שעות " + clockOutTimeStr + " - " + clockInTimeStr;
        }
        return undefined;
    };

    render() {
        let {showNames, input, mode} = this.props;
        let shift = input.value;
        let icon = isWorking(shift) ?
            <Tooltip title="בעבודה" placement="right"><Work/></Tooltip> :
            <Tooltip title="בבית" placement="right"><Home/></Tooltip>;
        let hebrewDay = momentToDay(shift.clockInTime);
        let errors = this.getErrors();
        let classes1 = "shift " + (this.state.focus ? "focus" : "");

        return (
            <div styleName={classes1} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
                 onFocus={this.onFocus} onBlur={this.onBlur}>
                <div styleName="name-container">
                    {mode === ReportModes.Live &&
                    <IconButton styleName="icon">{icon}</IconButton>
                    }
                    {showNames &&
                    <div styleName="name">{shift.user && shift.user.firstName}</div>
                    }
                </div>

                {mode === ReportModes.Report &&
                <div className={styles["date"]}>
                    <span>{hebrewDay}'</span>

                    <DatePicker autoOk onChange={(date) => this.onUpdateStartDate(date)} value={shift.clockInTime}
                                format="DD/MM/YYYY"
                                style={{margin: "0 10px"}}
                                disableFuture
                    />
                </div>
                }

                <TimePicker
                    className={styles["time"]}
                    ampm={false}
                    autoOk
                    value={shift.clockInTime}
                    onChange={(time) => this.onUpdateStartTime(time)}
                />

                {(mode === ReportModes.Report || !!shift.clockOutTime) &&

                <TimePicker
                    className={styles["time"]}
                    ampm={false}
                    autoOk
                    value={shift.clockOutTime}
                    onChange={(time) => this.onUpdateEndTime(time)}
                />
                }
                {errors &&
                <div styleName="warning">
                    <WarningIcon text={errors}/>
                </div>
                }
                {this.state.hover &&
                <div>
                    {mode === ReportModes.Live && isWorking(shift) &&
                    <Tooltip title="סיים משמרת" placement="left">
                        <IconButton className={styles["elem"]} onClick={() => this.onShiftComplete()}><Home/></IconButton>
                    </Tooltip>
                    }
                    <Tooltip title="מחיקת משמרת" placement="left">
                        <IconButton className={styles["elem"]} onClick={() => this.onDelete()}><Delete/></IconButton>
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

export default CSSModules(Shift, styles, {allowMultiple: true});
