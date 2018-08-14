import styles from "../../styles/Warning.scss";
import WarningIcon from "./WarningIcon";
import React from "react";

const Warning = ({warning}) => {
    if (!warning)
        return null;

    return (
        <div className={styles["warning"]}>
            <WarningIcon text={warning}/>
        </div>
    );
};

export default Warning;
