import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DatePicker, TimePicker} from "@material-ui/pickers";
import moment from "moment";
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {convertTimeStrToMoment2, DATE_FORMAT, createShift as createShiftUtil, TIME_FORMAT} from "../helpers/utils";
import "../styles/AddShiftDialog.scss";
import {getDefaultClockInTime, getDefaultClockOutTime} from "../selectors";
import CheckBoxList from "./CheckBoxList";

const AddShiftsDialog = ({open, employees, defaultStartDate, onCreate, onCancel}) => {
    let defaultClockInTime = useSelector(getDefaultClockInTime);
    let defaultClockOutTime = useSelector(getDefaultClockOutTime);
    const [employeesToAdd, setEmployeesToAdd] = useState([]);
    const [startTime, setStartTime] = useState(moment(defaultClockInTime, TIME_FORMAT));
    const [endTime, setEndTime] = useState(moment(defaultClockOutTime, TIME_FORMAT));
    const [startDate, setStartDate] = useState(moment(defaultStartDate, DATE_FORMAT));

    const toggleEmployee = (employee, check) => {
        const currentIndex = employeesToAdd.indexOf(employee);
        const newEmployeesToAdd = [...employeesToAdd];

        if (check) {
            newEmployeesToAdd.push(employee);
        } else {
            newEmployeesToAdd.splice(currentIndex, 1);
        }

        setEmployeesToAdd(newEmployeesToAdd);
    };

    const handleCreate = () => {
        for (let employee of employeesToAdd) {
            let shift = createShift(employee);
            onCreate(shift);
        }

        handleCancel();
    };

    const handleCancel = () => {
        setEmployeesToAdd([]);
        onCancel();
    };

    const createShift = (employee) => {
        let timeObj = {
            startDate,
            startTime,
            endTime,
        };
        let {momentStart, momentEnd} = convertTimeStrToMoment2(timeObj);
        return createShiftUtil(employee, momentStart, momentEnd);
    };

    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>הוספת משמרת</DialogTitle>
            <DialogContent>
                <div styleName="pickers">
                    <DatePicker styleName="picker" autoOk onChange={(date) => setStartDate(date)}
                                value={startDate}
                                format="DD/MM/YYYY"
                    />

                    <TimePicker
                        styleName="picker"
                        ampm={false}
                        autoOk
                        value={startTime}
                        onChange={(time) => setStartTime(time)}
                    />

                    <TimePicker
                        ampm={false}
                        autoOk
                        value={moment(endTime)}
                        onChange={(time) => setEndTime(time)}
                    />
                </div>
                <CheckBoxList
                    items={employees}
                    onCheck={(employee, check) => toggleEmployee(employee, check)}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreate} variant="contained" color="primary" disabled={employeesToAdd.length === 0}>
                    {employeesToAdd.length > 0 ? `הוסף ל- ` + employeesToAdd.length + ` אנשים` : "הוסף"}
                </Button>
                <Button onClick={handleCancel} color="primary">
                    ביטול
                </Button>
            </DialogActions>
        </Dialog>
    );
    }
;

AddShiftsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
    defaultStartDate: PropTypes.string.isRequired,
};
AddShiftsDialog.defaultProps = {};

export default AddShiftsDialog;
