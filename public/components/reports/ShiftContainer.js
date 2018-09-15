import React from "react";
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import {convertMomentToTimeStr, convertTimeStrToMoment, getCurrentTime, ReportModes} from "../../helpers/utils";
import moment from "moment";
import styles from "../../styles/Shift.scss";
import LiveShift from "./LiveShift";
import ReportShift from "./ReportShift";

class ShiftContainer extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            focus: false,
        };
    }

    onUpdateStartDate = (date, shift) => {
        let {startTimeStr, endTimeStr} = convertMomentToTimeStr(shift);
        let newStartDateStr = date.format("YYYY-MM-DD");

        this.onUpdate(newStartDateStr, startTimeStr, endTimeStr);
    }

    onUpdateStartTime = (time, shift) => {
        let {startDateStr, endTimeStr} = convertMomentToTimeStr(shift);
        let newStartTimeStr = time.format("HH:mm");

        this.onUpdate(startDateStr, newStartTimeStr, endTimeStr);
    }

    onUpdateEndTime = (time, shift) => {
        let {startDateStr, startTimeStr} = convertMomentToTimeStr(shift);
        let newEndTimeStr = time.format("HH:mm");

        this.onUpdate(startDateStr, startTimeStr, newEndTimeStr);
    }

    onUpdate = (startDateStr, startTimeStr, endTimeStr) => {
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

    onDelete = () => {
        let {onDelete, input} = this.props;

        onDelete(input.value);
    };

    openShiftDialog = () => {
        let {openShiftDialog, input} = this.props;

        // TODO Chen same shift is sent every time... tired...
        openShiftDialog(input.value, (editedShift) => input.onChange(editedShift));
    };

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
        const {focus, hover} = this.state;
        let errors = this.getErrors();
        let classes1 = "shift " + (focus ? "focus" : "");

        return (
            <div styleName={classes1} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
                      onFocus={this.onFocus} onBlur={this.onBlur}>
                {mode === ReportModes.Live &&
                    <LiveShift
                        showNames={showNames}
                        shift={input.value}
                        errors={errors}
                        hover={hover}
                        onUpdateStartTime={this.onUpdateStartTime}
                        onUpdateEndTime={this.onUpdateEndTime}
                        onDelete={this.onDelete}
                        onShiftComplete={this.onShiftComplete}
                        openShiftDialog={this.openShiftDialog}
                    />
                }
                {mode === ReportModes.Report &&
                    <ReportShift
                        showNames={showNames}
                        shift={input.value}
                        errors={errors}
                        hover={hover}
                        onUpdateStartDate={this.onUpdateStartDate}
                        onUpdateStartTime={this.onUpdateStartTime}
                        onUpdateEndTime={this.onUpdateEndTime}
                        onDelete={this.onDelete}
                        openShiftDialog={this.openShiftDialog}
                    />
                }
            </div>
        );
    }
}

ShiftContainer.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    openShiftDialog: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    mode: PropTypes.number.isRequired,
};

export default CSSModules(ShiftContainer, styles, {allowMultiple: true});
