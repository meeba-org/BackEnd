import moment from "moment";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createShift, updateShift} from "../../actions";
import {fetchDailyReport, showDeleteShiftModal} from "../../actions/shiftsActions";
import {fetchUsers} from "../../actions/usersActions";
import {calculateCurrentDay, DATE_FORMAT} from "../../helpers/utils";
import {getDailyShifts} from "../../selectors";
import DailyReport from "./DailyReport";

const DailyReportContainer = ({updateShift, createShift, deleteShift, shifts, employees, mode, fetchDailyReport, fetchEmployees, history}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentDay, setCurrentDay] = useState(calculateCurrentDay());
    
    useEffect(() => {
        onDayChange(currentDay);
    }, [currentDay]);

    const onDayChange = (currDay) => {
        if (!currDay)
            return;

        setIsLoading(true);
        fetchDailyReport(currDay);
        fetchEmployees(() => setIsLoading(false));
    };
    
    const onRefresh = () => fetchEmployees(() => setIsLoading(false));

    const onNextDay = () => {
        const nextDay = moment(currentDay).add(1, 'days');
        handleChange(nextDay);
    };

    const onPrevDay = () => {
        const prevDay = moment(currentDay).subtract(1, 'days');
        handleChange(prevDay);
    };

    const handleChange = (date) => {
        let currentDay = moment(date).format(DATE_FORMAT);
        setCurrentDay(currentDay);
    };

    const navigateToEmployees = () => {
        history.push('/dashboard/employees');
    };

    return (
        <DailyReport
            shifts={shifts}
            mode={mode}
            employees={employees}
            onDeleteShift={deleteShift}
            onUpdateShift={updateShift}
            onCreateShift={createShift}
            onNextDay={onNextDay}
            onPrevDay={onPrevDay}
            onDayChange={onDayChange}
            currentDay={currentDay}
            isLoading={isLoading}
            handleChange={handleChange}
            navigateToEmployees={navigateToEmployees}
            onRefresh={onRefresh}
        />
    );
};

const mapStateToProps = state => ({
    shifts: getDailyShifts(state),
    employees: state.users,
});

const mapDispatchToProps = {
    fetchDailyReport,
    fetchEmployees: fetchUsers,
    updateShift: (shift, month, year) => updateShift(shift, false, month, year),
    createShift,
    deleteShift: showDeleteShiftModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DailyReportContainer));

