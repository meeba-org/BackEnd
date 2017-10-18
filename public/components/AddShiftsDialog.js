import React, {Component} from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import {calculateCurrentDay} from "../helpers/utils";
import moment from "moment";
import CheckBoxList from "./CheckBoxList";


class AddShiftsDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeesToAdd: []
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

        console.log(newEmployeesToAdd);
        this.setState({
            employeesToAdd: newEmployeesToAdd,
        });
    }

    render() {
        let {onCancel, onCreate, open, employees} = this.props;
        let startTime = moment(8, "HH");
        let endTime = moment(startTime).add(8, 'hours');

        return (
            <Dialog open={open} onRequestClose={onCancel}>
                <DialogTitle>הוספת משמרת</DialogTitle>
                <DialogContent>
                    <TextField className="daily-date" type="date" defaultValue={calculateCurrentDay()} label="תאריך"
                               onChange={(e) => this.handleChange(e)} />

                    <TextField className="elem" type="time" defaultValue={startTime.format("HH:MM")} label="כניסה"
                               // onChange={(e) => this.onUpdateStartTime(e, "clockOutTime")}
                    />
                    <TextField className="elem" type="time" defaultValue={endTime.format("HH:MM")} label="יציאה"
                               // onChange={(e) => this.onUpdateEndTime(e, "clockOutTime")}
                    />

                    <CheckBoxList
                        items={employees}
                        onCheck={(employee, check) => this.toggleEmployee(employee, check)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={onCreate} color="primary">
                        {this.state.employeesToAdd.length > 0 ? `Add ` + this.state.employeesToAdd.length + ` people` : "Add"}
                    </Button>
                    <Button onClick={onCancel} color="primary">
                        ביטול
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddShiftsDialog.propTypes = {};
AddShiftsDialog.defaultProps = {};

export default AddShiftsDialog;
