import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from "material-ui";
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import {FieldArray} from "redux-form";
import ShiftsList from "./ShiftsList";
import styles from "../../styles/MonthlyReportLine.scss";
import CSSModules from "react-css-modules";
import HoursBar from '../HoursBar';
import {ReportModes} from "../../helpers/utils";

class MonthlyReportLine extends React.Component {
    render() {
        let {input, isCollapsed, onToggle, onCreateShift, onUpdateShift, onDeleteShift} = this.props;
        let toggleButton = isCollapsed ? <KeyboardArrowLeft/> : <KeyboardArrowDown/>;
        return (
            <div className="monthly-report-block">
                <div className="monthly-report-header">
                    <IconButton className="toggle-icon"
                                onClick={() => onToggle(input.value.uid)}>{toggleButton}</IconButton>
                    <div className="uid">{input.value.uid}</div>
                    <div className="name">{input.value.firstName} {input.value.lastName}</div>
                    <HoursBar {...input.value} />
                </div>
                {!isCollapsed &&
                <FieldArray
                    name={`${input.name}.shifts`}
                    component={ShiftsList}
                    onDelete={onDeleteShift}
                    onUpdate={onUpdateShift}
                    onCreate={onCreateShift}
                    showNames={false}
                    mode={ReportModes.Report}
                />
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

