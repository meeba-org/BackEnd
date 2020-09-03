import React from 'react';
import excelImage from '../../styles/images/excel.png';
import './styles/ReportFeatureContent.scss';

const ReportFeatureContent = () => {
    return (
        <div styleName="report-content">
            <img src={excelImage} loading="lazy" />
        </div>
    );
};

export default ReportFeatureContent;
