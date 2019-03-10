import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Select from "@material-ui/core/Select";
import styles from "../styles/MonthlyReport.scss";
import MenuItem from '@material-ui/core/MenuItem';
import Input from "@material-ui/core/Input";
import moment from 'moment';

class MonthPicker extends Component {
    state = {
        currentMonth: moment().month() + 1,
        currentYear: moment().year(),
    };

    createMonthMenuItems = () => {
        let res = [];
        const {currentYear, currentMonth} = this.state;
        const {selectedYear} = this.props;

        // If current year create only months that exist
        let maxMonth = currentYear === selectedYear ? currentMonth : 12;

        for (let i = 1; i <= maxMonth; i++) {
            res.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }

        return res;
    };

    createYearMenuItems = () => {
        let res = [];
        const {currentYear} = this.state;

        for (let i = 2017; i <= currentYear; i++) {
            res.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }

        return res;
    };


    handleMonthChange(event)  {
        let newSelectedMonth = event.target.value;
        const {onMonthChange, selectedYear} = this.props;

        onMonthChange(newSelectedMonth, selectedYear);
    }

    handleYearChange(event)  {
        let newSelectedYear = event.target.value;
        let {onMonthChange, selectedMonth, selectedYear} = this.props;

        if (newSelectedYear > selectedYear) { // year was increased
            selectedMonth = 1;
        }
        else if (newSelectedYear < selectedYear) {
            selectedMonth = 12;
        }

        onMonthChange(selectedMonth, newSelectedYear);
    }

    render() {
        const {selectedMonth, selectedYear} = this.props;

        return (
            <Fragment>
                <Select
                    className={styles["select"]}
                    value={selectedMonth}
                    onChange={(event) => this.handleMonthChange(event)}
                    input={<Input />}
                >
                    {this.createMonthMenuItems()}
                </Select>

                <Select
                    className={styles["select"]}
                    value={selectedYear}
                    onChange={(event) => this.handleYearChange(event)}
                    input={<Input />}
                >
                    {this.createYearMenuItems()}
                </Select>
            </Fragment>
        );
    }
}

MonthPicker.propTypes = {
    onMonthChange: PropTypes.func.isRequired,
    selectedMonth: PropTypes.number.isRequired,
    selectedYear: PropTypes.number.isRequired,
};
MonthPicker.defaultProps = {};

export default MonthPicker;
