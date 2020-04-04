import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from "react";
import {IfGranted} from "react-authorization";
import Field from "redux-form/es/Field";
import {EXCEL} from "../../../models/EReportFormat";
import * as ERoles from "../../helpers/ERoles";
import {DATE_FORMAT} from "../../helpers/utils";
import '../../styles/MonthlyReport.scss';
import AddShiftsDialog from "../AddShiftsDialog";
import Fade from "../Fade";
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import MonthPicker from "../MonthPicker";
import NoData from "../NoData";

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

    handleExportReportClick = () => {
        const {selectedMonth, selectedYear} = this.state;

        this.props.onExportReport(selectedMonth, selectedYear);
    };

    onMonthChange = (selectedMonth, selectedYear) => {
        this.setState({selectedMonth, selectedYear});

        this.props.onMonthChange(selectedMonth, selectedYear);
    };

    handleOpenAddDialog = () => {
        this.setState({open: true});
    };

    handleCloseAddDialog = () => {
        this.setState({open: false});
    };

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
        const {fields, employees, userRole, showShiftDialog, reportLineComponent, title, postUpdate, isDesktop, startOfMonth, defaultExportFormat} = this.props;
        const {selectedYear, selectedMonth} = this.state;

        return (
            <MbCard title={title} styleName="monthly-report">
                <MbActionsControls>
                    <AddShiftsDialog
                        open={this.state.open}
                        onCreate={this.onCreateShift}
                        onCancel={this.handleCloseAddDialog}
                        employees={employees}
                        defaultStartDate={moment().year(selectedYear).month(selectedMonth - 1).startOf('month').format(DATE_FORMAT)}
                    />
                    <MonthPicker
                        onMonthChange={this.onMonthChange}
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        isDesktop={isDesktop}
                        startOfMonth={startOfMonth}
                    />

                    <MbActionButton
                        onClick={this.handleOpenAddDialog}
                        iconComponent={AddIcon}
                        tooltip={"הוספת משמרת"}
                    />

                    <IfGranted expected={ERoles.COMPANY_MANAGER} actual={[userRole]}>
                            <MbActionButton
                                onClick={this.handleExportReportClick}
                                iconComponent={SaveAltIcon}
                                tooltip={`ייצוא דוח חודשי ל${defaultExportFormat === EXCEL ? "אקסל" : "מיכפל"}`}
                            />
                    </IfGranted>
                </MbActionsControls>

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
            </MbCard>
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
    onExportReport: PropTypes.func.isRequired,
    userRole: PropTypes.string,
};

export default MonthlyReport;
