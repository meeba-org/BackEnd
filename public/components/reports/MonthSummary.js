import React from 'react';
import MbInfoLabel from "./MbInfoLabel";
import "../../styles/MonthSummary.scss";

const MonthSummary = ({summary}) => {
    return (
        <div styleName="container">
            <MbInfoLabel label="סך כל השעות:" value={summary.totalHours}/>
            <div styleName="hr" />
            <MbInfoLabel label="מספר עובדים:" value={summary.employeesCount}/>
        </div>
    );
};

export default MonthSummary;
