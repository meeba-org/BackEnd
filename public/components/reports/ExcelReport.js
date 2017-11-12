import React from "react";
import {Button, Card, Input} from "material-ui";
import Select from 'material-ui/Select';
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AssignmentIcon from 'material-ui-icons/Assignment';
import {MenuItem} from 'material-ui/Menu';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/MonthlyReport.scss';
import moment from 'moment';

class ExcelReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment().startOf('month').format('MM-YYYY')
        };
    }
    generateMonthStr = (month, year) => moment().year(year).month(month).startOf('month').format('MM-YYYY');

    generateMonths() {
        return [
            {date: this.generateMonthStr(8, 2017), name: "ספטמבר 2017"},
            {date: this.generateMonthStr(9, 2017), name: "אוקטובר 2017"},
            {date: this.generateMonthStr(10, 2017), name: "נובמבר 2017"},
            {date: this.generateMonthStr(11, 2017), name: "דצמבר 2017"},
        ];
    }

    handleChange(event)  {
        this.setState({date: event.target.value});
    }

    handleClick = () => {
        let value = moment(this.state.date, "MM-YYYY");

        this.props.onGenerate(value.format('MM'), value.format('YYYY'));
    };

    render() {
        const months = this.generateMonths();

        return (
            <Card id="monthly-report">
                <CardHeader title="יצוא לאקסל"/>

                <CardContent className="card-content">

                    <div>
                        <Select
                            className="select"
                            value={this.state.date}
                            onChange={(event) => this.handleChange(event)}
                            input={<Input id="age-simple"/>}
                        >
                            {months.map((month) =>
                                <MenuItem key={month.name} value={month.date}>{month.name}</MenuItem>
                            )}
                        </Select>

                        <Button dense raised color="primary" onClick={() => this.handleClick()}><AssignmentIcon /></Button>
                    </div>

                </CardContent>
            </Card>
        );
    }
}

ExcelReport.propTypes = {
    fields: PropTypes.object,
    employees: PropTypes.array,
    onGenerate: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
    onStartDayOfMonthChange: PropTypes.func.isRequired,
};
export default CSSModules(ExcelReport, styles);
