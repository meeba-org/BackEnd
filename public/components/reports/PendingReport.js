import RefreshIcon from "@material-ui/icons/Refresh";
import React from 'react';
import {ReportModes} from "../../helpers/utils";
import './styles/ReportDailyReport.scss';
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import ShiftsList from "./ShiftsList";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const PendingReport = ({shifts, onDeleteShift, postUpdate, onRefresh, onApproveAll}) => {
    return (
        <MbCard title={"משמרות ממתינות לאישור"}>
            <div styleName="daily-report">
                <MbActionsControls>
                    <MbActionButton
                        tooltip={"רענן"}
                        onClick={onRefresh}
                        iconComponent={RefreshIcon}
                    />
                    
                    <MbActionButton
                        tooltip={"אשר הכל"}
                        onClick={onApproveAll}
                        iconComponent={PlaylistAddCheckIcon}
                        disabled={shifts?.length === 0}
                    />
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
