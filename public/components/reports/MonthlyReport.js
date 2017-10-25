import React from "react";
import {Button, Card, Divider, Input} from "material-ui";
import Select from 'material-ui/Select';
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import MonthlyReportLine from "./MonthlyReportLine";
import {Field} from "redux-form";
import {MenuItem} from 'material-ui/Menu';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/MonthlyReport.scss';
import moment from 'moment';
import NoData from "../NoData";
import AddShiftsDialog from "../AddShiftsDialog";
import {DATE_FORMAT} from "../../helpers/utils";

class MonthlyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: null,
            startDayOfMonth: moment().startOf('month').format(DATE_FORMAT),
            open: false,
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

    handleClickOpen() {
        this.setState({open: true});
    }

    handleRequestClose() {
        this.setState({open: false});
    }

    render() {
        const {fields, onCreateShift, onUpdateShift, onDeleteShift, employees} = this.props;
        let startDayOfMonth = this.state.startDayOfMonth;
        const months = this.generateMonths();

        return (
            <Card id="monthly-report">
                <CardHeader title="דוח חודשי"/>

                <CardContent className="card-content">

                    <div>
                        <Button className="add-button" dense raised color="primary" onClick={() => this.handleClickOpen()}><AddIcon /></Button>
                        <AddShiftsDialog
                            open={this.state.open}
                            onCreate={onCreateShift}
                            onCancel={() => this.handleRequestClose()}
                            employees={employees}
                        />

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

                        {fields && fields.map((employeeShiftsReport, index) =>
                            <Field component={MonthlyReportLine}
                                   name={employeeShiftsReport}
                                   isCollapsed={this.isCollapsed(fields, index)}
                                   key={index}
                                   onToggle={(name) => this.onToggle(name)}
                                   onDeleteShift={onDeleteShift}
                                   onUpdateShift={onUpdateShift}
                                   onCreateShift={onCreateShift}
                            />
                        )}
                        {(!fields || (fields.length == 0)) &&
                            <NoData/>
                        }
                    </div>

                </CardContent>
            </Card>
        );
    }
}

MonthlyReport.propTypes = {
    fields: PropTypes.object,
    employees: PropTypes.array,
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
    onStartDayOfMonthChange: PropTypes.func.isRequired,
};
export default CSSModules(MonthlyReport, styles);
