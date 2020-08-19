import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from 'react';
import {ReportModes} from "../../helpers/utils";
import './styles/DailyReport.scss';
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import ShiftsList from "./ShiftsList";

const PendingReport = ({shifts, onDeleteShift, postUpdate, onRefresh}) => {
    return (
        <MbCard title={"משמרות ממתינות לאישור"}>
            <div styleName="daily-report">
                <MbActionsControls>
                    <Tooltip title="רענן" placement="top">
                        <span> {/* Fix this: https://github.com/mbrn/material-table/issues/677#issuecomment-572448876*/}
                            <MbActionButton
                                onClick={onRefresh}
                                iconComponent={RefreshIcon}
                            />
                        </span>
                    </Tooltip>
                </MbActionsControls>

                <ShiftsList
                    shifts={shifts}
                    onDelete={onDeleteShift}
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
