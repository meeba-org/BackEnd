import moment from "moment";
import React, {Fragment, useState} from "react";
import {createShiftForClockIn, DATE_FORMAT, ReportModes} from "../../helpers/utils";
import LiveDailyReport from "./LiveDailyReport";
import ReportDailyReport from "./ReportDailyReport";

const DailyReport = ({shifts, onCreateShift, onUpdateShift, onDeleteShift, employees, mode, isLoading, onNextDay, onPrevDay, handleChange, currentDay, navigateToEmployees, onRefresh}) => {
    const [open, setOpen] = useState(false);

    const onClockIn = (employee) => {
        let shift = createShiftForClockIn(employee);
        onCreateShift(shift);
    };

    const handleUpdateShift = (shift) => {
        let value = moment(currentDay, DATE_FORMAT);
        onUpdateShift(shift, value.format('MM'), value.format('YYYY'));
    };

    const hasEmployees = (employees) => {
        return employees && employees.length > 0;
    };

    return (
        <Fragment>
            {(mode === ReportModes.Report) &&
                <ReportDailyReport
                    onChange={handleChange} 
                    value={currentDay} 
                    onPrevDay={onPrevDay}
                    onNextDay={onNextDay} 
                    onAddShift={() => setOpen(true)} 
                    open={open}
                    onCreate={onCreateShift} 
                    onCancel={() => setOpen(false)} 
                    employees={employees} 
                    shifts={shifts} 
                    onDelete={onDeleteShift}
                    onUpdate={handleUpdateShift} 
                    mode={mode}
                />
            }
            {(mode === ReportModes.Live) &&
                <LiveDailyReport
                    employees={employees} 
                    onSelect={onClockIn} 
                    loading={isLoading} 
                    hasEmployees={hasEmployees(employees)} 
                    onClick={navigateToEmployees} 
                    shifts={shifts} 
                    onDelete={onDeleteShift}
                    onUpdate={onUpdateShift} 
                    mode={mode} 
                    postUpdate={() => handleChange(currentDay)}
                    onRefresh={onRefresh}
                />
            }
        </Fragment>
    );
};

export default DailyReport;

