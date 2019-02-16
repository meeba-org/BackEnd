import React from "react";
import PropTypes from 'prop-types';
import styles from '../styles/TaskHoursBar.scss';
import CSSModules from "react-css-modules";
import {prepareHourToDisplay} from "../helpers/utils";

class TaskHoursBar extends React.Component {

    render() {
        let {totalHours, displayDetails} = this.props;
        const MAX_HOURS_PER_MONTH = 300;

        const factor = totalHours / MAX_HOURS_PER_MONTH;
        let totalHoursPer = Math.floor(100) * factor ;
        let totalDisplay = prepareHourToDisplay(totalHours);
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
    totalHours: PropTypes.string.isRequired,
    displayDetails: PropTypes.bool.isRequired,
};

export default CSSModules(TaskHoursBar, styles);

