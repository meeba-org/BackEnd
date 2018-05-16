import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, Tooltip} from "@material-ui/core";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import {FieldArray} from "redux-form";
import ShiftsList from "./ShiftsList";
import styles from "../../styles/MonthlyReportLine.scss";
import CSSModules from "react-css-modules";
import HoursBar from '../HoursBar';
import {ReportModes} from "../../helpers/utils";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HoursSummary from "./HoursSummary";

class MonthlyReportLine extends React.Component {
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
        let {input, isCollapsed, onToggle, onCreateShift, onUpdateShift, onDeleteShift} = this.props;
        let toggleButton = isCollapsed ?
            <Tooltip title="פרטי משמרות" placement="top"><KeyboardArrowLeft/></Tooltip> :
            <KeyboardArrowDown/>;

        return (
            <div className="monthly-report-block" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div className="monthly-report-header" onClick={() => onToggle(input.value.uid)}>
                    <IconButton color="primary" className="toggle-icon">{toggleButton}</IconButton>
                    <div className="name">{input.value.firstName} {input.value.lastName}</div>
                    <HoursBar {...input.value} displayDetails={this.state.hover}/>
                </div>
                {!isCollapsed &&
                <div className="monthly-report-body">
                    <ReactCSSTransitionGroup
                        transitionName="shiftsList"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>

                        <HoursSummary className="hours-summary" data={input.value}/>

                        <FieldArray
                            name={`${input.name}.shifts`}
                            component={ShiftsList}
                            onDelete={onDeleteShift}
                            onUpdate={onUpdateShift}
                            onCreate={onCreateShift}
                            showNames={false}
                            mode={ReportModes.Report}
                            shouldDisplayNoData={true}
                        />
                    </ReactCSSTransitionGroup>
                </div>
                }
            </div>
        );
    }
}

MonthlyReportLine.propTypes = {
    input: PropTypes.object.isRequired,
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
};

export default CSSModules(MonthlyReportLine, styles);

