import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DatePicker, TimePicker} from "@material-ui/pickers";
import moment from "moment";
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {convertTimeStrToMoment2, createShift, DATE_FORMAT} from "../helpers/utils";
import CheckBoxList from "./CheckBoxList";
import "../styles/AddShiftDialog.scss";

class AddShiftsDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            employeesToAdd: [],
            startDate: null,
            startTime: moment(8, "HH"),
            endTime: moment(8, "HH").add(8, 'hours')
        };
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

    onCreate = () => {
        let {onCreate} = this.props;
        let {employeesToAdd} = this.state;


        for (let employee of employeesToAdd) {
            let shift = this.createShift(employee);
            onCreate(shift);
        }

        this.onCancel();
    };

    onCancel = () => {
        const {onCancel} = this.props;

        this.setState({employeesToAdd: []});
        onCancel();
    };

    onUpdateStartTime(time) {
        this.setState({startTime: time});
    }

    onUpdateEndTime(time) {
        this.setState({endTime: time});
    }

    onUpdateDateChange(date) {
        this.setState({startDate: date});
    }

    createShift(employee) {
        let timeObj = {
            startDate: this.state.startDate || this.props.defaultStartDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
        };
        let {momentStart, momentEnd} = convertTimeStrToMoment2(timeObj);
        return createShift(employee, momentStart, momentEnd);
    }

    render() {
        let {open, employees, defaultStartDate} = this.props;
        let {startDate, startTime, endTime, employeesToAdd} = this.state;
        let defaultStartDateMoment = moment(defaultStartDate, DATE_FORMAT);

        return (
            <Dialog open={open} onClose={this.onCancel}>
                <DialogTitle>הוספת משמרת</DialogTitle>
                <DialogContent>
                    <div styleName="pickers">
                        <DatePicker autoOk onChange={(date) => this.onUpdateDateChange(date)}
                                    value={startDate || defaultStartDateMoment}
                                    format="DD/MM/YYYY"
                                    style={{margin: "0 10px"}}
                        />

                        <TimePicker
                            ampm={false}
                            autoOk
                            value={startTime}
                            onChange={(time) => this.onUpdateStartTime(time)}
                        />

                        <TimePicker
                            ampm={false}
                            autoOk
                            value={moment(endTime)}
                            onChange={(time) => this.onUpdateEndTime(time)}
                        />
                    </div>
                    <CheckBoxList
                        items={employees}
                        onCheck={(employee, check) => this.toggleEmployee(employee, check)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCreate} variant="contained" color="primary" disabled={employeesToAdd.length === 0}>
                        {employeesToAdd.length > 0 ? `הוסף ל- ` + employeesToAdd.length + ` אנשים` : "הוסף"}
                    </Button>
                    <Button onClick={this.onCancel} color="primary">
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
    defaultStartDate: PropTypes.string.isRequired,
};
AddShiftsDialog.defaultProps = {};

export default AddShiftsDialog;
