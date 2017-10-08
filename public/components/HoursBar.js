import React from "react";
// import PropTypes from 'prop-types';
import styles from '../styles/HoursBar.scss';
import CSSModules from "react-css-modules";

class HoursBar extends React.Component {
    render() {
        let {regularHours, extra125Hours, extra150Hours} = this.props;
        const MAX_HOURS_PER_MONTH = 200;

        let total = (parseFloat(regularHours) + parseFloat(extra125Hours) + parseFloat(extra150Hours));
        const factor = total / MAX_HOURS_PER_MONTH;
        let regularHoursPer = Math.floor(regularHours / total * 100) * factor ;
        let extra125HoursPer = Math.floor(extra125Hours / total * 100) * factor ;
        let extra150HoursPer = Math.floor(extra150Hours / total * 100) * factor ;
        return (
            <div className="stacked-bar-graph">
                <div className="regular-hours">{regularHours}</div>
                {extra125HoursPer > 0 &&
                    <div className="extra-125">{extra125Hours}</div>
                }
                {extra150HoursPer > 0 &&
                    <div className="extra-150">{extra150Hours}</div>
                }

                <span style={{width: regularHoursPer + '%'}} className="regular-hours-bar" />
                {extra125HoursPer > 0 &&
                    <span style={{width: extra125HoursPer + '%'}} className="extra-125-bar" />
                }
                {extra150HoursPer > 0 &&
                    <span style={{width: extra150HoursPer + '%'}} className="extra-150-bar" />
                }
            </div>
        );
    }
}

// HoursBar.propTypes = {};

export default CSSModules(HoursBar, styles);

