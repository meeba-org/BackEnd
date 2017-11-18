import React from "react";
import {Button, Card, Divider, Input, Tooltip} from "material-ui";
import Select from 'material-ui/Select';
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import AssignmentIcon from 'material-ui-icons/Assignment';
import MonthlyReportLine from "./MonthlyReportLine";
import {Field} from "redux-form";
import {MenuItem} from 'material-ui/Menu';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/MonthlyReport.scss';
import moment from 'moment';
import NoData from "../NoData";
import AddShiftsDialog from "../AddShiftsDialog";
import {IfGranted} from "react-authorization";
import * as ERoles from "../../helpers/ERoles";

class MonthlyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: null,
            startDayOfMonth: moment().startOf('month').format('MM-YYYY'),
            open: false,
        };
    }

    componentDidMount() {
        this.onStartDayOfMonthChange(this.state.startDayOfMonth);
    }

    isCollapsed(fields, index) {
        let employee = fields.get(index);
        return this.state.collapsed !== employee.uid;
    }

    onToggle(name) {
        let newCollapsedelement = this.state.collapsed === name ? null : name;
        this.setState({collapsed: newCollapsedelement});
    }

    generateMonthStr = (month, year) => moment().year(year).month(month).startOf('month').format('MM-YYYY');

    generateMonths() {
        return [
            {startDay: this.generateMonthStr(8, 2017), name: "ספטמבר 2017"},
            {startDay: this.generateMonthStr(9, 2017), name: "אוקטובר 2017"},
            {startDay: this.generateMonthStr(10, 2017), name: "נובמבר 2017"},
            {startDay: this.generateMonthStr(11, 2017), name: "דצמבר 2017"},
        ];
    }

    handleGenerateExcelClick = () => {
        let value = moment(this.state.startDayOfMonth, "MM-YYYY");

        this.props.onGenerateExcel(value.format('MM'), value.format('YYYY'));
    };

    handleChange(event)  {
        let startDayOfMonth = event.target.value;

        this.setState({startDayOfMonth});
        this.onStartDayOfMonthChange(startDayOfMonth);
    }

    onStartDayOfMonthChange(selectedMonth) {
        let value = moment(selectedMonth, "MM-YYYY");
        this.props.onStartDayOfMonthChange(value.format('MM'), value.format('YYYY'));
    }

    handleOpenAddDialog() {
        this.setState({open: true});
    }

    handleCloseAddDialog() {
        this.setState({open: false});
    }

    render() {
        const {fields, onCreateShift, onUpdateShift, onDeleteShift, employees, userRole} = this.props;
        let startDayOfMonth = this.state.startDayOfMonth;
        const months = this.generateMonths();

        return (
            <Card id="monthly-report">
                <CardHeader title="דוח חודשי"/>

                <CardContent className="card-content">

                    <div>
                        <div className="controls-line">
                            <AddShiftsDialog
                                open={this.state.open}
                                onCreate={onCreateShift}
                                onCancel={() => this.handleCloseAddDialog()}
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

                            <Tooltip title="הוספת משמרת" placement="top">
                                <Button className="action-button" dense raised color="primary"
                                        onClick={() => this.handleOpenAddDialog()}><AddIcon/></Button>
                            </Tooltip>

                            <IfGranted expected={ERoles.COMPANY_MANAGER} actual={[userRole]}>
                                <Tooltip title="ייצוא דוח חודשי לאקסל" placement="top">
                                    <Button className="action-button" dense raised color="primary"
                                            onClick={() => this.handleGenerateExcelClick()}><AssignmentIcon/></Button>
                                </Tooltip>
                            </IfGranted>
                        </div>
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
    onGenerateExcel: PropTypes.func.isRequired,
    userRole: PropTypes.string,
};

export default CSSModules(MonthlyReport, styles);
