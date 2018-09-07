import React from "react";
import PropTypes from 'prop-types';
import styles from '../styles/HoursBar.scss';
import CSSModules from "react-css-modules";
import {prepareHourToDisplay} from "../helpers/utils";

class HoursBar extends React.Component {

    render() {
        let {regularHours, extra125Hours, extra150Hours, extra175Hours, extra200Hours, displayDetails} = this.props;
        const MAX_HOURS_PER_MONTH = 300;

        let total = (parseFloat(regularHours) + parseFloat(extra125Hours) + parseFloat(extra150Hours) + parseFloat(extra175Hours) + parseFloat(extra200Hours));
        const factor = total / MAX_HOURS_PER_MONTH;
        let regularHoursPer = Math.floor(regularHours / total * 100) * factor ;
        let extra125HoursPer = Math.floor(extra125Hours / total * 100) * factor ;
        let extra150HoursPer = Math.floor(extra150Hours / total * 100) * factor ;
        let extra175HoursPer = Math.floor(extra175Hours / total * 100) * factor ;
        let extra200HoursPer = Math.floor(extra200Hours / total * 100) * factor ;
        let totalDisplay = prepareHourToDisplay(total);
        return (
            <div styleName="stacked-bar-graph">
                <span style={{width: regularHoursPer + '%'}} styleName="regular-hours-bar" />
                {extra125HoursPer > 0 &&
                    <span style={{width: extra125HoursPer + '%'}} styleName="extra-125-bar" />
                }
                {extra150HoursPer > 0 &&
                    <span style={{width: extra150HoursPer + '%'}} styleName="extra-150-bar" />
                }
                {extra175HoursPer > 0 &&
                    <span style={{width: extra175HoursPer + '%'}} styleName="extra-175-bar" />
                }
                {extra200HoursPer > 0 &&
                    <span style={{width: extra200HoursPer + '%'}} styleName="extra-200-bar" />
                }

                {displayDetails &&
                    <div styleName="details">{totalDisplay} שעות</div>
                }
            </div>
        );
    }
}

HoursBar.propTypes = {
    regularHours: PropTypes.string.isRequired,
    extra125Hours: PropTypes.string.isRequired,
    extra150Hours: PropTypes.string.isRequired,
    extra175Hours: PropTypes.string.isRequired,
    extra200Hours: PropTypes.string.isRequired,
    overallHours: PropTypes.string.isRequired,
    displayDetails: PropTypes.bool.isRequired,
};

export default CSSModules(HoursBar, styles);

