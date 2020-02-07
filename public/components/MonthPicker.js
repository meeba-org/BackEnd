import Input from "@material-ui/core/Input";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import "../styles/MonthlyReport.scss";
import MbActionButton from "./MbActionButton";

const MobileDateDisplay = ({month, year}) => {

    return (
        <Typography style={{color: "#525252"}} variant={"h5"}>{`${year % 1000} / ${month.toString().padStart(2, '0')}`}</Typography>
    );
};

class MonthPicker extends Component {
    state = {
        currentMonth: moment().month() + 1,
        currentYear: moment().year(),
    };

    monthMap = {
        1: "ינואר",
        2: "פברואר",
        3: "מרץ",
        4: "אפריל",
        5: "מאי",
        6: "יוני",
        7: "יולי",
        8: "אוגוסט",
        9: "ספטמבר",
        10: "אוקטובר",
        11: "נובמבר",
        12: "דצמבר",
    };

    createMonthMenuItems = () => {
        let res = [];
        const {currentYear, currentMonth} = this.state;
        const {selectedYear} = this.props;

        // If current year create only months that exist
        let maxMonth = currentYear === selectedYear ? currentMonth : 12;

        for (let i = 1; i <= maxMonth; i++) {
            res.push(<MenuItem key={i} value={i}>{this.monthMap[i]}</MenuItem>);
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

    prevMonth = () => {
        const {selectedMonth, selectedYear, onMonthChange} = this.props;
        let newSelectedMonth = selectedMonth - 1;
        let newSelectedYear = selectedYear;

        if (newSelectedMonth < 1) {
            newSelectedMonth = 12;
            newSelectedYear = selectedYear - 1;
        }

        onMonthChange(newSelectedMonth, newSelectedYear);
    };

    nextMonth = () => {
        const {selectedMonth, selectedYear, onMonthChange} = this.props;
        let newSelectedMonth = selectedMonth + 1;
        let newSelectedYear = selectedYear;

        if (newSelectedMonth > 12) {
            newSelectedMonth = 1;
            newSelectedYear = selectedYear + 1;
        }

        onMonthChange(newSelectedMonth, newSelectedYear);
    };

    onMonthChange = event => {
        let newSelectedMonth = event.target.value;
        this.handleMonthChange(newSelectedMonth);
    };

    handleMonthChange = (newSelectedMonth) => {
        const {onMonthChange, selectedYear} = this.props;

        onMonthChange(newSelectedMonth, selectedYear);
    };

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
        const {selectedMonth, selectedYear, isDesktop} = this.props;

        return (
            <Fragment>
                {isDesktop &&
                <Fragment>
                    <Select
                        styleName="select"
                        value={selectedMonth}
                        onChange={(event) => this.onMonthChange(event)}
                        input={<Input/>}
                    >
                        {this.createMonthMenuItems()}
                    </Select>

                    <Select
                        styleName="select"
                        value={selectedYear}
                        onChange={(event) => this.handleYearChange(event)}
                        input={<Input/>}
                    >
                        {this.createYearMenuItems()}
                    </Select>
                </Fragment>
                }
                {!isDesktop &&
                <MobileDateDisplay month={selectedMonth} year={selectedYear} />
                }

                <MbActionButton
                    onClick={this.prevMonth}
                    iconComponent={NavigateNext}
                    tooltip="חודש אחורה"
                />
                <MbActionButton
                    onClick={this.nextMonth}
                    iconComponent={NavigateBefore}
                    tooltip="חודש קדימה"
                    disabled={selectedMonth === this.state.currentMonth}
                />

            </Fragment>
        );
    }
}

MonthPicker.propTypes = {
    onMonthChange: PropTypes.func.isRequired,
    selectedMonth: PropTypes.number.isRequired,
    selectedYear: PropTypes.number.isRequired,
    isDesktop: PropTypes.bool.isRequired
};
MonthPicker.defaultProps = {};

export default MonthPicker;
