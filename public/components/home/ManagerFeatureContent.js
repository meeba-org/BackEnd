import React from 'react';
import browserImage from '../../styles/images/browser.png';
import './styles/ManagerFeatureContent.scss';

const ManagerFeatureContent = () => {
    return (
        <div styleName="manager-content">
            <img src={browserImage} loading="lazy" />
        </div>
    );
};

export default ManagerFeatureContent;
