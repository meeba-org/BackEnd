import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from 'react';
import {ReportModes} from "../../helpers/utils";
import '../../styles/DailyReport.scss';
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import ShiftsList from "./ShiftsList";

const PendingReport = ({shifts, showShiftDialog, onDeleteShift, postUpdate, onRefresh}) => {
    return (
        <MbCard title={"משמרות ממתינות לאישור"}>
            <div styleName="daily-report">
                <MbActionsControls>
                    <Tooltip title="רענן" placement="top">
                        <MbActionButton
                            onClick={onRefresh}
                            iconComponent={RefreshIcon}
                        />
                    </Tooltip>
                </MbActionsControls>

                <ShiftsList
                    shifts={shifts}
                    onDelete={onDeleteShift}
                    showShiftDialog={showShiftDialog}
                    showNames={true}
                    mode={ReportModes.Report}
                    shouldDisplayNoData={true}
                    postUpdate={postUpdate}
                />
            </div>
        </MbCard>
    );
};

export default PendingReport;
