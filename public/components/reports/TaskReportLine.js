import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {ReportModes} from "../../helpers/utils";
import "../../styles/MonthlyReportLine.scss";
import HoursBar from "../HoursBar";
import HoursSummary from "./HoursSummary";
import ShiftsList from "./ShiftsList";

const TaskBreadCrumb = ({taskBreadCrumb}) => {
    if (!taskBreadCrumb)
        return null;

    return (
        <div styleName="name">
            {taskBreadCrumb.map((t, index) => (
                <Fragment key={index}>
                    {index === 0 ?
                        <div styleName="crumb">{t.title}</div> :
                        <div styleName="crumb"><KeyboardArrowLeft styleName="icon"/>{t.title}</div>
                    }
                </Fragment>
            ))
            }
        </div>
    );
};

class TaskReportLine extends React.PureComponent {
    state = {
        hover: false
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    render() {
        let {data, isCollapsed, onToggle, onDeleteShift, showShiftDialog, index, postUpdate} = this.props;
        let toggleButton = isCollapsed ?
            <Tooltip title="פרטי משמרות" placement="top"><KeyboardArrowLeft/></Tooltip> :
            <KeyboardArrowDown/>;

        return (
            <div styleName="monthly-report-block" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div styleName="monthly-report-header" onClick={() => onToggle(index)}>
                    <IconButton styleName="toggle-button" color="primary" >{toggleButton}</IconButton>
                    <TaskBreadCrumb taskBreadCrumb={data.taskBreadCrumb} />
                    <HoursBar {...data} displayDetails={this.state.hover}/>
                </div>
                {!isCollapsed &&
                <div styleName="monthly-report-body">
                        <HoursSummary data={data}/>

                        <ShiftsList
                            shifts={data.shifts}
                            onDelete={onDeleteShift}
                            showShiftDialog={showShiftDialog}
                            showNames={true}
                            mode={ReportModes.Report}
                            shouldDisplayNoData={true}
                            postUpdate={postUpdate}
                        />
                </div>
                }
            </div>
        );
    }
}

TaskReportLine.propTypes = {
    onDeleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    postUpdate: PropTypes.func.isRequired,
};

export default TaskReportLine;

