import moment from "moment";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {createShift, updateShift} from "../../actions";
import PropTypes from 'prop-types';
import {fetchDailyReport, showDeleteShiftModal} from "../../actions/shiftsActions";
import {calculateCurrentDay, DATE_FORMAT} from "../../helpers/utils";
import {getDailyShifts} from "../../selectors";
import DailyReport from "./DailyReport";
import {fetchUsers} from "../../actions/usersActions";

const DailyReportContainer = ({updateShift, createShift, deleteShift, shifts, employees, mode, fetchDailyReport, fetchEmployees}) => {
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

    const onNextDay = () => {
        const nextDay = moment(currentDay).add(1, 'days');
        handleChange(nextDay);
    };

    const onPrevDay = () => {
        const prevDay = moment(currentDay).subtract(1, 'days');
        handleChange(prevDay);
    };

    const handleChange = (date) => {
        let currentDay = date.format(DATE_FORMAT);
        setCurrentDay(currentDay);
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
        />
    );
};

DailyReportContainer.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
    route: PropTypes.object,
    fetchDailyReport: PropTypes.func.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    createShift: PropTypes.func.isRequired,
    updateShift: PropTypes.func.isRequired,
    deleteShift: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(DailyReportContainer);

