import React from 'react';
import MbInfoLabel from "./MbInfoLabel";
import "./styles/MonthSummary.scss";

const ReportSummary = ({summary}) => {
    return (
        <div styleName="container">
            <MbInfoLabel label="סך כל השעות:" value={summary.totalHours} tooltip="סך כל השעות בתעריפים השונים (100%, 125% וכו')"/>
            <div styleName="hr" />
            <MbInfoLabel label="מספר עובדים:" value={summary.employeesCount}/>
        </div>
    );
};

export default ReportSummary;
