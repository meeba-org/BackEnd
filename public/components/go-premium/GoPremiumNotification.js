import React from 'react';
import {showGoPremiumModal} from "../../actions";
import "../../styles/EmployeesList.scss";
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';

const GoPremiumNotification = ({isVisible, text, showGoPremiumModal}) => {
    if (!isVisible)
        return null;

    return (
        <div styleName="limit-container">
            <ArrowIcon styleName="icon"/>
            <div styleName="text">{text}</div>
            <Button styleName="button" color="primary"  onClick={showGoPremiumModal}>הירשם כמנוי</Button>
        </div>
    );
};

const mapDispatchToProps = {
    showGoPremiumModal
};

export default connect(null, mapDispatchToProps)(GoPremiumNotification);


