import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PropTypes from 'prop-types';
import React from 'react';
import FieldArray from "redux-form/es/FieldArray";
import {ReportModes} from "../../helpers/utils";
import "../../styles/MonthlyReportLine.scss";
import HoursBar from '../HoursBar';
import HoursSummary from "./HoursSummary";
import ShiftsList from "./ShiftsList";


class MonthlyReportLine extends React.PureComponent {
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
                    <IconButton styleName="toggle-button" color="primary">{toggleButton}</IconButton>
                    <div styleName="name">{data.fullName}</div>
                    <HoursBar {...data} displayDetails={this.state.hover}/>
                </div>
                {!isCollapsed &&
                <div styleName="monthly-report-body">
                    <HoursSummary data={data}/>

                    <ShiftsList
                        shifts={data.shifts}
                        onDelete={onDeleteShift}
                        showShiftDialog={showShiftDialog}
                        showNames={false}
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

MonthlyReportLine.propTypes = {
    onDeleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    postUpdate: PropTypes.func.isRequired,
};

export default MonthlyReportLine;

