import "./styles/Warning.scss";
import WarningIcon from "./WarningIcon";
import React from "react";
import PropTypes from "prop-types";

const Warning = ({warning}) => {
    if (!warning)
        return null;

    return (
        <div styleName="warning">
            <WarningIcon text={warning}/>
        </div>
    );
};

Warning.propTypes = {
    warning: PropTypes.string,
};

export default Warning;
