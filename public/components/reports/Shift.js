import * as React from "react";
import PropTypes from 'prop-types';
import {IconButton, TextField} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import moment from "moment";
import styles from "../../styles/Shift.scss";
import CSSModules from "react-css-modules";
import {convertTimeStrToMoment} from "../../helpers/utils";

class Shift extends React.Component {

    constructor(props) {
        super(props);

        let {clockInTime, clockOutTime, location} = this.props.input.value;

        this.state = {
            startDateStr: moment(clockInTime).format("YYYY-MM-DD"),
            startTimeStr: moment(clockInTime).format("HH:mm"),
            endTimeStr: moment(clockOutTime).format("HH:mm"),
            location: location
        };
    }

    onUpdateStartDate(e) {
        let {startTimeStr, endTimeStr} = this.state;
        let newStartDateStr = e.target.value;

        this.setState({startDateStr: newStartDateStr});
        this.onUpdate(newStartDateStr, startTimeStr, endTimeStr);
    }

    onUpdateStartTime(e) {
        let {startDateStr, endTimeStr} = this.state;
        let newStartTimeStr = e.target.value;

        this.setState({startTimeStr: newStartTimeStr});
        this.onUpdate(startDateStr, newStartTimeStr, endTimeStr);
    }

    onUpdateEndTime(e) {
        let {startDateStr, startTimeStr} = this.state;
        let newEndTimeStr = e.target.value;

        this.setState({endTimeStr: newEndTimeStr});
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

    // onUpdateStartDate(e) {
    //     let {input} = this.props;
    //
    //     let newStartDate = e.target.value;
    //     let oldStartTime = moment(input.value.clockInTime).format("HH:mm");
    //     let newValue = moment(newStartDate + ' ' + oldStartTime, 'YYYY-MM-DD HH:mm');
    //
    //     this.onUpdate("clockInTime", newValue.format());
    // }
    //
    // onUpdateStartTime(e) {
    //     let {input} = this.props;
    //
    //     let oldStartDate = moment(input.value.clockInTime).format("YYYY-MM-DD");
    //     let newStartTime = e.target.value;
    //     let newValue = moment(oldStartDate + ' ' + newStartTime, 'YYYY-MM-DD HH:mm');
    //
    //     this.onUpdate("clockInTime", newValue.format());
    // }
    //
    // onUpdateEndTime(e) {
    //     let {input} = this.props;
    //
    //     let oldEndDate = moment(input.value.clockOutTime).format("YYYY-MM-DD");
    //     let newEndTime = e.target.value;
    //     let newValue = moment(oldEndDate + ' ' + newEndTime, 'YYYY-MM-DD HH:mm');
    //
    //     this.onUpdate("clockOutTime", newValue.format());
    // }

    // onUpdate(fieldName, value) {
    //     let {input, onUpdate} = this.props;
    //
    //     let entity = {
    //         ...input.value,
    //         [fieldName]: value,
    //     };
    //
    //     input.onChange(entity);
    //     onUpdate(entity);
    // }

    onDelete() {
        let {onDelete, input} = this.props;

        onDelete(input.value);
    }

    render() {
        let {showNames, input} = this.props;

        return (
            <div className="shift">
                {showNames &&
                    input.value.user.firstName
                }
                <TextField className="elem" type="date" defaultValue={this.state.startDateStr} placeholder="תאריך"
                           onChange={(e) => this.onUpdateStartDate(e)}/>
                <TextField className="elem" type="time" defaultValue={this.state.startTimeStr} placeholder="כניסה"
                           onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}/>
                <TextField className="elem" type="time" defaultValue={this.state.endTimeStr} placeholder="יציאה"
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
