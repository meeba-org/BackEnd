import React from "react";
import {Button, Card, Divider, Input, Select, Tooltip} from "@material-ui/core";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MonthlyReportLine from "./MonthlyReportLine";
import {Field} from "redux-form";
import MenuItem from '@material-ui/core/MenuItem';
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
            {startDay: this.generateMonthStr(0, 2018), name: "ינואר 2018"},
            {startDay: this.generateMonthStr(1, 2018), name: "פברואר 2018"},
            {startDay: this.generateMonthStr(2, 2018), name: "מרץ 2018"},
            {startDay: this.generateMonthStr(3, 2018), name: "אפריל 2018"},
            {startDay: this.generateMonthStr(4, 2018), name: "מאי 2018"},
            {startDay: this.generateMonthStr(5, 2018), name: "יוני 2018"},
        ];
    }

    handleGenerateExcelClick = () => {
        let value = moment(this.state.startDayOfMonth, "MM-YYYY");

        this.props.onGenerateExcel(value.format('MM'), value.format('YYYY'));
    };

    handleMonthChange(event)  {
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

    onCreateShift = (shift) => {
        let value = moment(this.state.startDayOfMonth, "MM-YYYY");
        this.props.onCreateShift(shift, value.format('MM'), value.format('YYYY'));
    };

    onUpdateShift = (shift, input) => {
        let value = moment(this.state.startDayOfMonth, "MM-YYYY");
        this.props.onUpdateShift(shift, value.format('MM'), value.format('YYYY'), input);
    };

    onDeleteShift = (shift) => {
        let value = moment(this.state.startDayOfMonth, "MM-YYYY");
        this.props.onDeleteShift(shift, value.format('MM'), value.format('YYYY'));
    };

    render() {
        const {fields, employees, userRole} = this.props;
        let startDayOfMonth = this.state.startDayOfMonth;
        const months = this.generateMonths();

        return (
            <Card className={styles["monthly-report"]}>
                <CardHeader title="דוח חודשי"/>

                <CardContent className={styles["card-content"]}>

                    <div>
                        <div className={styles["controls-line"]}>
                            <AddShiftsDialog
                                open={this.state.open}
                                onCreate={this.onCreateShift}
                                onCancel={() => this.handleCloseAddDialog()}
                                employees={employees}
                            />

                            <Select
                                className={styles["select"]}
                                value={startDayOfMonth}
                                onChange={(event) => this.handleMonthChange(event)}
                                input={<Input />}
                            >
                                {months.map((month) =>
                                    <MenuItem key={month.name} value={month.startDay}>{month.name}</MenuItem>
                                )}
                            </Select>

                            <Tooltip title="הוספת משמרת" placement="top">
                                <Button className={styles["action-button"]} variant="raised" color="primary"
                                        onClick={() => this.handleOpenAddDialog()}><AddIcon/></Button>
                            </Tooltip>

                            <IfGranted expected={ERoles.COMPANY_MANAGER} actual={[userRole]}>
                                <Tooltip title="ייצוא דוח חודשי לאקסל" placement="top">
                                    <Button className={styles["action-button"]} variant="raised" color="primary"
                                            onClick={() => this.handleGenerateExcelClick()}><AssignmentIcon/></Button>
                                </Tooltip>
                            </IfGranted>
                        </div>
                        <Divider className={styles["divider"]}/>

                        {fields && fields.map((employeeShiftsReport, index) =>
                            <Field component={MonthlyReportLine}
                                   name={employeeShiftsReport}
                                   isCollapsed={this.isCollapsed(fields, index)}
                                   key={index}
                                   onToggle={(name) => this.onToggle(name)}
                                   onDeleteShift={this.onDeleteShift}
                                   onUpdateShift={this.onUpdateShift}
                                   onCreateShift={this.onCreateShift}
                            />
                        )}
                        {(!fields || (fields.length == 0)) &&
                            <NoData text="לא נמצאו משמרות"/>
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
