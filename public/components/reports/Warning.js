import styles from "../../styles/Warning.scss";
import WarningIcon from "./WarningIcon";
import React from "react";
import PropTypes from "prop-types";

const Warning = ({warning}) => {
    if (!warning)
        return null;

    return (
        <div className={styles["warning"]}>
            <WarningIcon text={warning}/>
        </div>
    );
};

Warning.propTypes = {
    warning: PropTypes.string,
};

export default Warning;