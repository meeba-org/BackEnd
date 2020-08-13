import {EmojiObjects, SaveAlt} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from "react";
import {IfGranted} from "react-authorization";
import {EXCEL, INNOVATION_AUTHORITY} from "../../../models/EReportFormat";
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
import MonthSummary from "./MonthSummary";

const MonthlyReport = (
    {
        employeeShiftsReports, employees, userRole, showShiftDialog, ReportLineComponent, title, postUpdate, isDesktop, startOfMonth, defaultExportFormat, 
        onExportReport, onMonthChange, onCreateShift, onDeleteShift, isInnovativeAuthorityEnable, summary
    }) => {
    
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
    const [selectedYear, setSelectedYear] = useState(moment().year());
    
    useEffect(() => {
        onMonthChange(selectedMonth, selectedYear);
    }, []);

    const isCollapsed = (fields, index) => collapsedIndex !== index;

    const onToggle = (index) => {
        let newCollapsedIndex = collapsedIndex === index ? null : index;
        setCollapsedIndex(newCollapsedIndex);
    };

    const handleExportReportClick = () => {
        onExportReport(selectedMonth, selectedYear);
    };

    const handleExportInnovationAuthorityReportClick = () => {
        onExportReport(selectedMonth, selectedYear, INNOVATION_AUTHORITY);
    };

    const handleMonthChange = (selectedMonth, selectedYear) => {
        setSelectedMonth(selectedMonth);
        setSelectedYear(selectedYear);

        onMonthChange(selectedMonth, selectedYear);
    };

    const handleOpenAddDialog = () => setOpen(true);

    const handleCloseAddDialog = () => setOpen(false);

    const handleCreateShift = (shift) => {
        onCreateShift(shift, selectedMonth, selectedYear);
    };

    const handleDeleteShift = (shift) => {
        onDeleteShift(shift, selectedMonth, selectedYear);
    };
    
    return (
        <MbCard title={title} styleName="monthly-report">
            <MbActionsControls>
                <AddShiftsDialog
                    open={open}
                    onCreate={handleCreateShift}
                    onCancel={handleCloseAddDialog}
                    employees={employees}
                    defaultStartDate={moment().year(selectedYear).month(selectedMonth - 1).startOf('month').format(DATE_FORMAT)}
                />
                <MonthPicker
                    onMonthChange={handleMonthChange}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    isDesktop={isDesktop}
                    startOfMonth={startOfMonth}
                />

                <MbActionButton
                    onClick={handleOpenAddDialog}
                    iconComponent={AddIcon}
                    tooltip={"הוספת משמרת"}
                />

                <IfGranted expected={ERoles.COMPANY_MANAGER} actual={[userRole]}>
                    <MbActionButton
                        onClick={handleExportReportClick}
                        iconComponent={SaveAlt}
                        tooltip={`ייצוא דוח חודשי ל${defaultExportFormat === EXCEL ? "אקסל" : "מיכפל"}`}
                    />
                    {isInnovativeAuthorityEnable &&
                    <MbActionButton
                        onClick={handleExportInnovationAuthorityReportClick}
                        iconComponent={EmojiObjects}
                        tooltip={"ייצוא דוח הרשות לחדשנות"}
                    />
                    }
                </IfGranted>

                {summary &&
                    <MonthSummary summary={summary}/>
                }
            </MbActionsControls>

            {employeeShiftsReports &&
            employeeShiftsReports
                .map((employeeShiftsReport, index) =>
                    (<Fade key={index} isVisible>
                        <ReportLineComponent
                            data={employeeShiftsReport}
                            isCollapsed={isCollapsed(employeeShiftsReports, index)}
                            index={index}
                            onToggle={(name) => onToggle(name)}
                            onDeleteShift={handleDeleteShift}
                            showShiftDialog={showShiftDialog}
                            postUpdate={postUpdate}
                        />
                    </Fade>)
                )
                //.filter((obj, index) => this.filterEmployees(obj, index, fields, this.state.employeesFilter))
            }
            {(!employeeShiftsReports || (employeeShiftsReports.length === 0)) &&
            <NoData text="לא נמצאו משמרות"/>
            }
        </MbCard>
    );
};

MonthlyReport.propTypes = {
    fields: PropTypes.array,
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
