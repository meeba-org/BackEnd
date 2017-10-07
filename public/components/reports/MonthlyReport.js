import * as React from "react";
import {Button, Card, Divider, Input} from "material-ui";
import Select from 'material-ui/Select';
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import EmployeeReport from "./MonthlyReportLine";
import {Field} from "redux-form";
import {MenuItem} from 'material-ui/Menu';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/MonthlyReport.scss';
import moment from 'moment';

class MonthlyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: null,
            startDayOfMonth: moment().startOf('month').format("YYYY-MM-DD")
        };
    }

    componentDidMount() {
        this.props.onStartDayOfMonthChange(this.state.startDayOfMonth);
    }

    isCollapsed(fields, index) {
        let employee = fields.get(index);
        return this.state.collapsed !== employee.uid;
    }

    onToggle(name) {
        let newCollapsedelement = this.state.collapsed === name ? null : name;
        this.setState({collapsed: newCollapsedelement});
    }

    generateMonths() {
        return [
            {startDay: "2017-09-01", name: "ספטמבר 2017"},
            {startDay: "2017-10-01", name: "אוקטובר 2017"},
            {startDay: "2017-11-01", name: "נובמבר 2017"},
            {startDay: "2017-12-01", name: "דצמבר 2017"},
        ];
    }

    handleChange(event)  {
        let startDayOfMonth = event.target.value;

        this.setState({startDayOfMonth});
        this.props.onStartDayOfMonthChange(startDayOfMonth);
    }

    render() {
        const {fields, onCreateShift, onUpdateShift, onDeleteShift} = this.props;
        let startDayOfMonth = this.state.startDayOfMonth;
        const months = this.generateMonths();

        return (
            <Card id="monthly-report">
                <CardHeader title="דוח חודשי"/>

                <CardContent className="card-content">

                    <div>
                        <Button className="add-button" dense raised color="primary" onClick={() => this.onCreate(fields)}><AddIcon /></Button>

                        <Select
                            className="select"
                            value={startDayOfMonth}
                            onChange={(event) => this.handleChange(event)}
                            input={<Input id="age-simple"/>}
                        >
                            {months.map((month) =>
                                <MenuItem key={month.name} value={month.startDay}>{month.name}</MenuItem>
                            )}
                        </Select>

                        <Divider className="divider"/>

                        {fields && fields.map((employee, index) =>
                            <Field component={EmployeeReport}
                                   name={employee}
                                   isCollapsed={this.isCollapsed(fields, index)}
                                   key={index}
                                   onToggle={(name) => this.onToggle(name)}
                                   onDeleteShift={onDeleteShift}
                                   onUpdateShift={onUpdateShift}
                                   onCreateShift={onCreateShift}
                            />
                        )}
                    </div>

                </CardContent>
            </Card>
        );
    }
}

MonthlyReport.propTypes = {
    fields: PropTypes.object,
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
    onStartDayOfMonthChange: PropTypes.func.isRequired,
};
export default CSSModules(MonthlyReport, styles);
