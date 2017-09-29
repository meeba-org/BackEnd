import React from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton} from "material-ui";
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import {FieldArray} from "redux-form";
import ShiftsList from "./ShiftsList";
import styles from "../../styles/MonthlyReportLine.scss";
import CSSModules from "react-css-modules";

class MonthlyReportLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {input, isCollapsed, onToggle, onCreateShift, onUpdateShift, onDeleteShift} = this.props;
        let toggleButton =  isCollapsed ? <KeyboardArrowLeft/> : <KeyboardArrowDown/>;
        return (
            <div className="monthly-report-line">
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={2}>
                        <IconButton onClick={()=> onToggle(input.value.uid)}>{toggleButton}</IconButton>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {input.value.uid}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {input.value.firstName} {input.value.lastName}
                    </Grid>
                    <Grid item xs={12} sm={1} className="regular-hours">
                        {input.value.regularHours}
                    </Grid>
                    <Grid item xs={12} sm={1} className="extra-125">
                        {input.value.extra125Hours}
                    </Grid>
                    <Grid item xs={12} sm={1} className="extra-150">
                        {input.value.extra150Hours}
                    </Grid>
                    {!isCollapsed &&
                        <Grid item sm={12}>
                        <FieldArray name={`${input.name}.shifts`} component={ShiftsList}
                                    onDelete={onDeleteShift} onUpdate={onUpdateShift} onCreate={onCreateShift}/>
                        </Grid>
                    }

                </Grid>
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

