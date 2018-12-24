import React from 'react';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import FieldArray from "redux-form/es/FieldArray";
import ShiftsList from "./ShiftsList";
import CSSModules from "react-css-modules";
import HoursBar from '../HoursBar';
import {ReportModes} from "../../helpers/utils";
import HoursSummary from "./HoursSummary";
import styles from "../../styles/MonthlyReportLine.scss";


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
        let {input, isCollapsed, onToggle, onCreateShift, onUpdateShift, onDeleteShift, showShiftDialog, showMapModal} = this.props;
        let toggleButton = isCollapsed ?
            <Tooltip title="פרטי משמרות" placement="top"><KeyboardArrowLeft/></Tooltip> :
            <KeyboardArrowDown/>;

        return (
            <div styleName="monthly-report-block" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div styleName="monthly-report-header" onClick={() => onToggle(input.value.uid)}>
                    <IconButton className={styles["toggle-button"]} color="primary" >{toggleButton}</IconButton>
                    <div styleName="name">{input.value.fullName}</div>
                    <HoursBar {...input.value} displayDetails={this.state.hover}/>
                </div>
                {!isCollapsed &&
                <div styleName="monthly-report-body">
                        <HoursSummary data={input.value}/>

                        <FieldArray
                            name={`${input.name}.shifts`}
                            component={ShiftsList}
                            onDelete={onDeleteShift}
                            showShiftDialog={showShiftDialog}
                            showMapModal={showMapModal}
                            onUpdate={onUpdateShift}
                            onCreate={onCreateShift}
                            showNames={false}
                            mode={ReportModes.Report}
                            shouldDisplayNoData={true}
                        />
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
    showShiftDialog: PropTypes.func.isRequired,
    showMapModal: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
};

export default CSSModules(MonthlyReportLine, styles);

