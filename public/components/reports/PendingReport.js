import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import React, {Component} from 'react';
import FieldArray from "redux-form/es/FieldArray";
import {DATE_FORMAT, ReportModes} from "../../helpers/utils";
import '../../styles/DailyReport.scss';
import ActionButton from "../ActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import moment from "./DailyReport";
import ShiftsList from "./ShiftsList";

class PendingReport extends Component {
    state = {

    };

    onUpdateShift = (shift) => {
        let value = moment(this.state.currentDay, DATE_FORMAT);
        this.props.onUpdateShift(shift, value.format('MM'), value.format('YYYY'));
    };

    render() {
        const {showShiftDialog, onDeleteShift, postUpdate, onRefresh} = this.props;

        return (
            <MbCard title={"משמרות ממתינות לאישור"}>
                    <div styleName="daily-report">
                        <MbActionsControls>
                            <Tooltip title="רענן" placement="top">
                                <ActionButton
                                    onClick={onRefresh}
                                    iconComponent={RefreshIcon}
                                />
                            </Tooltip>
                        </MbActionsControls>

                        <FieldArray
                            name="shifts"
                            component={ShiftsList}
                            onDelete={onDeleteShift}
                            onUpdate={this.onUpdateShift}
                            showShiftDialog={showShiftDialog}
                            showNames={true}
                            mode={ReportModes.Report}
                            shouldDisplayNoData={true}
                            postUpdate={postUpdate}
                        />
                    </div>
            </MbCard>
        );
    }
}

PendingReport.propTypes = {};
PendingReport.defaultProps = {};

export default PendingReport;
