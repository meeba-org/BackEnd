import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Warning from "@material-ui/icons/Warning";
import Tooltip from "@material-ui/core/Tooltip";

class WarningIcon extends Component {
    render() {
        let {text} = this.props;

        return (
            <Tooltip title={text} placement="top">
                <Warning />
            </Tooltip>
        );
    }
}

WarningIcon.propTypes = {
    text: PropTypes.string.isRequired
};
WarningIcon.defaultProps = {};

export default WarningIcon;
