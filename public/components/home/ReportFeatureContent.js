import React, {Component} from 'react';
import playStoreImage from '../../styles/images/playStore.svg';

class ReportFeatureContent extends Component {
    render() {
        return (
            <div>
                <img src={playStoreImage}/>
            </div>
        );
    }
}

ReportFeatureContent.propTypes = {};
ReportFeatureContent.defaultProps = {};

export default ReportFeatureContent;
