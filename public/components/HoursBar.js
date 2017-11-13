import React from "react";
import PropTypes from 'prop-types';
import styles from '../styles/HoursBar.scss';
import CSSModules from "react-css-modules";
import {Tooltip} from "material-ui";

class HoursBar extends React.Component {
    render() {
        let {regularHours, extra125Hours, extra150Hours, displayDetails} = this.props;
        const MAX_HOURS_PER_MONTH = 200;

        let total = (parseFloat(regularHours) + parseFloat(extra125Hours) + parseFloat(extra150Hours));
        const factor = total / MAX_HOURS_PER_MONTH;
        let regularHoursPer = Math.floor(regularHours / total * 100) * factor ;
        let extra125HoursPer = Math.floor(extra125Hours / total * 100) * factor ;
        let extra150HoursPer = Math.floor(extra150Hours / total * 100) * factor ;
        return (
            <div className="stacked-bar-graph">
                <span style={{width: regularHoursPer + '%'}} className="regular-hours-bar" />
                {extra125HoursPer > 0 &&
                    <span style={{width: extra125HoursPer + '%'}} className="extra-125-bar" />
                }
                {extra150HoursPer > 0 &&
                    <span style={{width: extra150HoursPer + '%'}} className="extra-150-bar" />
                }

                {displayDetails &&
                    <div className="details">
                        <Tooltip title="100%" placement="top">
                            <div className="regular-hours">{regularHours}</div>
                        </Tooltip>
                        {extra125HoursPer > 0 &&
                            <Tooltip title="125%" placement="top">
                                <div className="extra-125">{extra125Hours}</div>
                            </Tooltip>
                        }
                        {extra150HoursPer > 0 &&
                            <Tooltip title="150%" placement="top">
                                <div className="extra-150">{extra150Hours}</div>
                            </Tooltip>
                        }
                    </div>
                }
            </div>
        );
    }
}

HoursBar.propTypes = {
    regularHours: PropTypes.string.isRequired,
    extra125Hours: PropTypes.string.isRequired,
    extra150Hours: PropTypes.string.isRequired,
    displayDetails: PropTypes.bool.isRequired,
};

export default CSSModules(HoursBar, styles);

