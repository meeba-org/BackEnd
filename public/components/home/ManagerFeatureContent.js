import React, {Component} from 'react';
import '../../styles/ManagerFeatureContent.scss';
import browserImage from '../../styles/images/browser.png';

class ManagerFeatureContent extends Component {
    render() {
        return (
            <div styleName="manager-content">
                <img src={browserImage}/>
            </div>
        );
    }
}

ManagerFeatureContent.propTypes = {};
ManagerFeatureContent.defaultProps = {};

export default ManagerFeatureContent;
