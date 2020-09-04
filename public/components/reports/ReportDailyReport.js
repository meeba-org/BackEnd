import Tooltip from "@material-ui/core/Tooltip";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import React from "react";
import AddShiftsDialog from "../AddShiftsDialog";
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import ShiftsList from "./ShiftsList";
import './styles/ReportDailyReport.scss';

const ReportDailyReport = ({employees, mode, onCancel, onChange, onPrevDay, onNextDay, onAddShift, onCreate, onDelete, onUpdate, open, shifts, value}) => (
    <MbCard title="דוח יומי">
        <div styleName="daily-report">
            <MbActionsControls>
                <DatePicker autoOk onChange={onChange} value={value}
                            format="DD/MM/YYYY"
                            styleName="date"
                            inputProps={{style: {textAlign: "center"}}}
                />

                <MbActionButton
                    onClick={onPrevDay}
                    iconComponent={NavigateNext}
                    tooltip="יום אחורה"
                />

                <MbActionButton
                    onClick={onNextDay}
                    iconComponent={NavigateBefore}
                    tooltip="יום קדימה"
                    disabled={moment(value).isSame(new Date(), "day")}
                />

                <Tooltip title="הוספת משמרת" placement="top">
                    <span> {/* Fix this: https://github.com/mbrn/material-table/issues/677#issuecomment-572448876*/}
                        <MbActionButton
                            onClick={onAddShift}
                            iconComponent={AddIcon}
                        />
                    </span>
                </Tooltip>
                <AddShiftsDialog
                    open={open}
                    onCreate={onCreate}
                    onCancel={onCancel}
                    employees={employees}
                    defaultStartDate={value}
                />
            </MbActionsControls>

            <ShiftsList
                shifts={shifts}
                onDelete={onDelete}
                onUpdate={onUpdate}
                showNames={true}
                mode={mode}
                shouldDisplayNoData={true}
            />
        </div>
    </MbCard>
);

export default ReportDailyReport;
