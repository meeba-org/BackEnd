import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MonthlyReportLine from "./MonthlyReportLine";
import Field from "redux-form/es/Field";
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/MonthlyReport.scss';
import moment from 'moment';
import NoData from "../NoData";
import AddShiftsDialog from "../AddShiftsDialog";
import {IfGranted} from "react-authorization";
import * as ERoles from "../../helpers/ERoles";
import Fade from "../Fade";
import {DATE_FORMAT} from "../../helpers/utils";


class MonthlyReport extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: null,
            startDayOfMonth: moment().startOf('month').format(DATE_FORMAT),
            selectedMonth: moment().month() + 1,
            selectedYear: moment().year(),
            open: false,
        };
    }

    componentDidMount() {
        // this.onStartDayOfMonthChange(this.state.startDayOfMonth);

        const {selectedMonth, selectedYear} = this.state;
        const {onMonthChange} = this.props;

        onMonthChange(selectedMonth, selectedYear)
    }

    isCollapsed(fields, index) {
        let employee = fields.get(index);
        return this.state.collapsed !== employee.uid;
    }

    onToggle(name) {
        let newCollapsedelement = this.state.collapsed === name ? null : name;
        this.setState({collapsed: newCollapsedelement});
    }

    generateMonthStr = (month, year) => moment().year(year).month(month-1).startOf('month').format(DATE_FORMAT);

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
            {startDay: this.generateMonthStr(6, 2018), name: "יולי 2018"},
            {startDay: this.generateMonthStr(7, 2018), name: "אוגוסט 2018"},
            {startDay: this.generateMonthStr(8, 2018), name: "ספטמבר 2018"},
            {startDay: this.generateMonthStr(9, 2018), name: "אוקטובר 2018"},
            {startDay: this.generateMonthStr(10, 2018), name: "נובמבר 2018"},
            {startDay: this.generateMonthStr(11, 2018), name: "דצמבר 2018"},
            {startDay: this.generateMonthStr(0, 2019), name: "ינואר 2019"},
            {startDay: this.generateMonthStr(1, 2019), name: "פברואר 2019"},
            {startDay: this.generateMonthStr(2, 2019), name: "מרץ 2019"},
            {startDay: this.generateMonthStr(3, 2019), name: "אפריל 2019"},
            {startDay: this.generateMonthStr(4, 2019), name: "מאי 2019"},
            {startDay: this.generateMonthStr(5, 2019), name: "יוני 2019"},
        ];
    }

    handleGenerateExcelClick = () => {
        // let value = moment(this.state.startDayOfMonth, DATE_FORMAT);
        const {selectedMonth, selectedYear} = this.state;

        this.props.onGenerateExcel(selectedMonth, selectedYear);
    };

    handleMonthChange(event)  {
        let selectedMonth = event.target.value;
        const {selectedYear} = this.state;
        const {onMonthChange} = this.props;

        this.setState({selectedMonth});
        onMonthChange(selectedMonth, selectedYear);
    }

    handleYearChange(event)  {
        let newSelectedYear = event.target.value;
        let {selectedMonth, selectedYear} = this.state;
        const {onMonthChange} = this.props;

        if (newSelectedYear > selectedYear) { // year was increased
            selectedMonth = 1;
        }
        else if (newSelectedYear < selectedYear) {
            selectedMonth = 12;
        }

        this.setState({selectedYear: newSelectedYear, selectedMonth});
        onMonthChange(selectedMonth, newSelectedYear);
    }

    // onStartDayOfMonthChange(selectedMonth) {
    //     let value = moment(selectedMonth, DATE_FORMAT);
    //     this.props.onStartDayOfMonthChange(value.format('MM'), value.format('YYYY'));
    // }

    handleOpenAddDialog() {
        this.setState({open: true});
    }

    handleCloseAddDialog() {
        this.setState({open: false});
    }

    onCreateShift = (shift) => {
        const {selectedYear, selectedMonth} = this.state;

        this.props.onCreateShift(shift, selectedMonth, selectedYear);
    };

    onUpdateShift = (shift) => {
        const {selectedYear, selectedMonth} = this.state;

        let value = moment().year(selectedYear).month(selectedMonth - 1);
        this.props.onUpdateShift(shift, value.format('MM'), value.format('YYYY'));
    };

    onDeleteShift = (shift) => {
        const {selectedYear, selectedMonth} = this.state;

        this.props.onDeleteShift(shift, selectedMonth, selectedYear);
    };

    createMenuItems = () => {
        let res = [];
        // If current year create only months that exist

        for (let i = 1; i <= 12; i++) {
            res.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }

        return res;
    };
    render() {
        const {fields, employees, userRole, showShiftDialog, showLocationModal} = this.props;
        let startDayOfMonth = this.state.startDayOfMonth;
        const {selectedYear, selectedMonth} = this.state;
        // const months = this.generateMonths();
        return (
            <Card>
                <CardHeader title="דוח חודשי"/>

                <CardContent className={styles["card-content"]}>

                    <div>
                        <div className={styles["controls-line"]}>
                            <AddShiftsDialog
                                open={this.state.open}
                                onCreate={this.onCreateShift}
                                onCancel={() => this.handleCloseAddDialog()}
                                employees={employees}
                                defaultStartDate={moment().year(selectedYear).month(selectedMonth - 1).startOf('month').format(DATE_FORMAT)}
                            />

                            <Select
                                className={styles["select"]}
                                value={selectedMonth}
                                onChange={(event) => this.handleMonthChange(event)}
                                input={<Input />}
                            >
                                {
                                    this.createMenuItems()
                                }
                                {/*<MenuItem key={2} value={1}>פברואר</MenuItem>*/}
                                {/*<MenuItem disabled key={2} value={3}>מרץ</MenuItem>*/}
                                {/*<MenuItem disabled key={3} value={4}>אפריל</MenuItem>*/}
                                {/*<MenuItem key={5} value={4}>מאי</MenuItem>*/}
                                {/*<MenuItem key={6} value={5}>יוני</MenuItem>*/}
                                {/*<MenuItem key={7} value={6}>יולי</MenuItem>*/}
                                {/*<MenuItem key={8} value={7}>אוגוסט</MenuItem>*/}
                                {/*<MenuItem key={9} value={8}>ספטמבר</MenuItem>*/}
                                {/*<MenuItem key={10} value={9}>אוקטובר</MenuItem>*/}
                                {/*<MenuItem key={11} value={10}>נובמבר</MenuItem>*/}
                                {/*<MenuItem key={12} value={11}>דצמבר</MenuItem>*/}
                            </Select>

                            <Select
                                className={styles["select"]}
                                value={selectedYear}
                                onChange={(event) => this.handleYearChange(event)}
                                input={<Input />}
                            >
                                <MenuItem key={2019} value={2019}>2019</MenuItem>
                                <MenuItem key={2018} value={2018}>2018</MenuItem>
                                <MenuItem key={2017} value={2017}>2017</MenuItem>
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
                                    (<Fade key={index} isVisible>
                                        <Field component={MonthlyReportLine}
                                               name={employeeShiftsReport}
                                               isCollapsed={this.isCollapsed(fields, index)}
                                               key={index}
                                               onToggle={(name) => this.onToggle(name)}
                                               onDeleteShift={this.onDeleteShift}
                                               showShiftDialog={showShiftDialog}
                                               showLocationModal={showLocationModal}
                                               onUpdateShift={this.onUpdateShift}
                                               onCreateShift={this.onCreateShift}
                                        />
                                    </Fade>)
                                )}
                                {(!fields || (fields.length === 0)) &&
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
    showShiftDialog: PropTypes.func.isRequired,
    showLocationModal: PropTypes.func.isRequired,
    onStartDayOfMonthChange: PropTypes.func.isRequired,
    onGenerateExcel: PropTypes.func.isRequired,
    userRole: PropTypes.string,
};

export default CSSModules(MonthlyReport, styles);
