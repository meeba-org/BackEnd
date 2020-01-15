import PropTypes from 'prop-types';
import React from "react";
import {prepareHourToDisplay} from "../helpers/utils";
import '../styles/HoursBar.scss';

class TaskHoursBar extends React.Component {

    render() {
        let {overallHours, displayDetails} = this.props;
        const MAX_HOURS_PER_MONTH = 300;

        const factor = overallHours / MAX_HOURS_PER_MONTH;
        let totalHoursPer = Math.floor(100) * factor ;
        let totalDisplay = prepareHourToDisplay(overallHours);
        return (
            <div styleName="stacked-bar-graph">
                <span style={{width: totalHoursPer + '%'}} styleName="regular-hours-bar" />

                {displayDetails &&
                    <div styleName="details">{totalDisplay} שעות</div>
                }
            </div>
        );
    }
}

TaskHoursBar.propTypes = {
    overallHours: PropTypes.string.isRequired,
    displayDetails: PropTypes.bool.isRequired,
};

export default TaskHoursBar;

