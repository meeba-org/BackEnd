import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from "react-css-modules";
import FieldArray from "redux-form/es/FieldArray";
import {ReportModes} from "../../helpers/utils";
import styles from "../../styles/MonthlyReportLine.scss";
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
        let {input, isCollapsed, onToggle, onDeleteShift, showShiftDialog, showLocationModal, index} = this.props;
        let toggleButton = isCollapsed ?
            <Tooltip title="פרטי משמרות" placement="top"><KeyboardArrowLeft/></Tooltip> :
            <KeyboardArrowDown/>;

        return (
            <div styleName="monthly-report-block" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div styleName="monthly-report-header" onClick={() => onToggle(index)}>
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
                            showLocationModal={showLocationModal}
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
    onDeleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    showLocationModal: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
};

export default CSSModules(MonthlyReportLine, styles);

