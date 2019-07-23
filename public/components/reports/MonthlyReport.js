import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from "react";
import {IfGranted} from "react-authorization";
import CSSModules from "react-css-modules";
import Field from "redux-form/es/Field";
import * as ERoles from "../../helpers/ERoles";
import {DATE_FORMAT} from "../../helpers/utils";
import styles from '../../styles/MonthlyReport.scss';
import AddShiftsDialog from "../AddShiftsDialog";
import Fade from "../Fade";
import MonthPicker from "../MonthPicker";
import NoData from "../NoData";
import SearchBar from "../SearchBar";


class MonthlyReport extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: null,
            startDayOfMonth: moment().startOf('month').format(DATE_FORMAT),
            selectedMonth: moment().month() + 1,
            selectedYear: moment().year(),
            open: false,
            employeesFilter: ""
        };
    }

    componentDidMount() {
        const {selectedMonth, selectedYear} = this.state;
        const {onMonthChange} = this.props;

        onMonthChange(selectedMonth, selectedYear);
    }

    isCollapsed(fields, index) {
        return this.state.collapsed !== index;
    }

    onToggle(index) {
        let newCollapsedIndex = this.state.collapsed === index ? null : index;
        this.setState({collapsed: newCollapsedIndex});
    }

    handleGenerateExcelClick = () => {
        const {selectedMonth, selectedYear} = this.state;

        this.props.onGenerateExcel(selectedMonth, selectedYear);
    };

    onMonthChange = (selectedMonth, selectedYear) => {
        this.setState({selectedMonth, selectedYear});

        this.props.onMonthChange(selectedMonth, selectedYear);
    }

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

    onDeleteShift = (shift) => {
        const {selectedYear, selectedMonth} = this.state;

        this.props.onDeleteShift(shift, selectedMonth, selectedYear);
    };

    filterEmployees = (result, index, fields, employeesFilter) => {
        if (!employeesFilter)
            return true;

        let entity = fields.get(index);

        if (!entity)
            return false;

        // In case its an entity entity...
        if (entity.fullName)
            return entity.fullName.includes(employeesFilter);

        // In case its an task entity...
        if (entity.title)
            return entity.title.includes(employeesFilter);

        return false;
    };

    render() {
        const {fields, employees, userRole, showShiftDialog, reportLineComponent, title, postUpdate} = this.props;
        const {selectedYear, selectedMonth} = this.state;

        return (
            <Card>
                <CardHeader title={title}/>

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

                            <MonthPicker
                                onMonthChange={this.onMonthChange}
                                selectedMonth={selectedMonth}
                                selectedYear={selectedYear}
                            />

                           <Tooltip title="הוספת משמרת" placement="top">
                                <Button className={styles["action-button"]} variant="contained" color="primary"
                                        onClick={() => this.handleOpenAddDialog()}><AddIcon/></Button>
                            </Tooltip>

                            <IfGranted expected={ERoles.COMPANY_MANAGER} actual={[userRole]}>
                                <Tooltip title="ייצוא דוח חודשי לאקסל" placement="top">
                                    <Button className={styles["action-button"]} variant="contained" color="primary"
                                            onClick={() => this.handleGenerateExcelClick()}><AssignmentIcon/></Button>
                                </Tooltip>
                            </IfGranted>
                            <SearchBar onChange={(filter) =>   {
                                this.setState({employeesFilter: filter});
                            }}/>
                        </div>
                        <Divider className={styles["divider"]}/>

                                {fields && fields.map((employeeShiftsReport, index) =>
                                    (<Fade key={index} isVisible>
                                        <Field component={reportLineComponent}
                                               name={employeeShiftsReport}
                                               isCollapsed={this.isCollapsed(fields, index)}
                                               index={index}
                                               onToggle={(name) => this.onToggle(name)}
                                               onDeleteShift={this.onDeleteShift}
                                               showShiftDialog={showShiftDialog}
                                               postUpdate={postUpdate}
                                        />
                                    </Fade>)
                                ).filter((obj, index) => this.filterEmployees(obj, index, fields, this.state.employeesFilter))}
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
    onDeleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    onStartDayOfMonthChange: PropTypes.func.isRequired,
    postUpdate: PropTypes.func.isRequired,
    onGenerateExcel: PropTypes.func.isRequired,
    userRole: PropTypes.string,
};

export default CSSModules(MonthlyReport, styles);
