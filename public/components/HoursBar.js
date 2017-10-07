import React from "react";
import PropTypes from 'prop-types';


class HoursBar extends React.Component {
    render() {
        let {regularHours, extra125Hours, extra150Hours} = this.props;
        return (
            <div>
                <div className="regular-hours">{regularHours}</div>
                <div className="extra-125">{extra125Hours}</div>
                <div className="extra-150">{extra150Hours}</div>
            </div>
        );
    }
}

HoursBar.propTypes = {};

export default HoursBar;
