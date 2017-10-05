import * as React from "react";
import PropTypes from 'prop-types';
import {IconButton, TextField} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import moment from "moment";
import styles from "../../styles/Shift.scss";
import CSSModules from "react-css-modules";

class Shift extends React.Component {

    constructor(props) {
        super(props);

        let {clockInTime, clockOutTime, location} = this.props.input.value;

        this.state = {
            startDate: moment(clockInTime).format("YYYY-MM-DD"),
            startTime: moment(clockInTime).format("HH:MM"),
            endTime: moment(clockOutTime).format("HH:MM"),
            location: location
        };
    }

    onUpdateStartDate(e) {
        let {input} = this.props;

        let newStartDate = e.target.value;
        let oldStartTime = moment(input.value.clockInTime).format("HH:MM");
        let newValue = moment(newStartDate + ' ' + oldStartTime, 'YYYY-MM-DD HH:MM');

        this.onUpdate("clockInTime", newValue.toISOString());
    }

    onUpdateStartTime(e) {
        let {input} = this.props;

        let oldStartDate = moment(input.value.clockInTime).format("YYYY-MM-DD ");
        let newStartTime = e.target.value;
        let newValue = moment(oldStartDate + ' ' + newStartTime, 'YYYY-MM-DD HH:MM');

        this.onUpdate("clockInTime", newValue.toISOString());
    }

    onUpdateEndTime(e) {
        let {input} = this.props;

        let oldEndDate = moment(input.value.clockOutTime).format("YYYY-MM-DD ");
        let newEndTime = e.target.value;
        let newValue = moment(oldEndDate + ' ' + newEndTime, 'YYYY-MM-DD HH:MM');

        this.onUpdate("clockOutTime", newValue.toISOString());
    }

    onUpdate(fieldName, value) {
        let {input, onUpdate} = this.props;

        let entity = {
            ...input.value,
            [fieldName]: value,
        };

        input.onChange(entity);
        onUpdate(entity);
    }

    render() {
        let {onDelete} = this.props;

        return (
            <div className="shift">
                <TextField className="elem" type="date" defaultValue={this.state.startDate} placeholder="תאריך"
                           onChange={(e) => this.onUpdateStartDate(e)}/>
                <TextField className="elem" type="time" defaultValue={this.state.startTime} placeholder="כניסה"
                           onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}/>
                <TextField className="elem" type="time" defaultValue={this.state.endTime} placeholder="יציאה"
                           onChange={(e) => this.onUpdateEndTime(e, "clockOutTime")}/>
                <IconButton className="elem" onClick={onDelete}><DeleteIcon/></IconButton>
            </div>
        );
    }
}

Shift.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default CSSModules(Shift, styles);
