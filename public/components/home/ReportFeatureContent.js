import React, {Component} from 'react';
import excelImage from '../../styles/images/excel.png';
import styles from '../../styles/ReportFeatureContent.scss';

class ReportFeatureContent extends Component {
    render() {
        return (
            <div styleName="report-content">
                <img src={excelImage}/>
            </div>
        );
    }
}

ReportFeatureContent.propTypes = {};
ReportFeatureContent.defaultProps = {};

export default ReportFeatureContent;
