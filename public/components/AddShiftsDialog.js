import React, {Component} from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import {calculateCurrentDay, convertTimeStrToMoment, createShift, DATE_FORMAT, TIME_FORMAT} from "../helpers/utils";
import moment from "moment";
import CheckBoxList from "./CheckBoxList";
import PropTypes from 'prop-types';


class AddShiftsDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeesToAdd: [],
            startDate: moment().format(DATE_FORMAT),
            startTime: moment(8, "HH").format(TIME_FORMAT),
            endTime: moment(8, "HH").add(8, 'hours').format(TIME_FORMAT)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && !this.props.open) {
            this.setState({employeesToAdd: []}); // resetting employeesToAdd
        }
    }

    toggleEmployee(employee, check) {
        const { employeesToAdd } = this.state;
        const currentIndex = employeesToAdd.indexOf(employee);
        const newEmployeesToAdd = [...employeesToAdd];

        if (check) {
            newEmployeesToAdd.push(employee);
        } else {
            newEmployeesToAdd.splice(currentIndex, 1);
        }

        this.setState({
            employeesToAdd: newEmployeesToAdd,
        });
    }

    onCreate() {
        let {onCreate, onCancel} = this.props;
        let {employeesToAdd} = this.state;


        for (let employee of employeesToAdd) {
            let shift = this.createShift(employee);
            onCreate(shift);
        }

        onCancel();
    }

    onUpdateStartTime(e) {
        this.setState({startTime: e.target.value});
    }

    onUpdateEndTime(e) {
        this.setState({endTime: e.target.value});
    }

    onUpdateDateChange(e) {
        this.setState({startDate: e.target.value});
    }

    createShift(employee) {
        let {startDate, startTime, endTime} = this.state;

        let {momentStart, momentEnd} = convertTimeStrToMoment(startDate, startTime, endTime);
        return createShift(employee, momentStart, momentEnd);
    }

    render() {
        let {onCancel, open, employees} = this.props;

        return (
            <Dialog open={open} onClose={onCancel}>
                <DialogTitle>הוספת משמרת</DialogTitle>
                <DialogContent>
                    <TextField type="date" defaultValue={calculateCurrentDay()} label="תאריך"
                               onChange={(e) => this.onUpdateDateChange(e)} />

                    <TextField type="time" defaultValue={this.state.startTime} label="כניסה"
                               onChange={(e) => this.onUpdateStartTime(e)}
                    />
                    <TextField type="time" defaultValue={this.state.endTime} label="יציאה"
                               onChange={(e) => this.onUpdateEndTime(e)}
                    />

                    <CheckBoxList
                        items={employees}
                        onCheck={(employee, check) => this.toggleEmployee(employee, check)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.onCreate()} dense raised color="primary">
                        {this.state.employeesToAdd.length > 0 ? `הוסף ל- ` + this.state.employeesToAdd.length + ` אנשים` : "הוסף"}
                    </Button>
                    <Button onClick={onCancel} color="primary">
                        ביטול
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddShiftsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,

};
AddShiftsDialog.defaultProps = {};

export default AddShiftsDialog;
