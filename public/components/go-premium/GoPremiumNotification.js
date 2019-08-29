import React from 'react';
import {showGoPremiumModal} from "../../actions";
import styles from "../../styles/EmployeesList.scss";
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';

const GoPremiumNotification = ({isVisible, text, showGoPremiumModal}) => {
    if (!isVisible)
        return null;

    return (
        <div className={styles["limit-container"]}>
            <ArrowIcon className={styles["icon"]}/>
            <div className={styles["text"]}>{text}</div>
            <Button className={styles["button"]} color="secondary"  onClick={showGoPremiumModal}>הירשם כמנוי</Button>
        </div>
    );
};

const mapDispatchToProps = {
    showGoPremiumModal
};

export default connect(null, mapDispatchToProps)(GoPremiumNotification);


