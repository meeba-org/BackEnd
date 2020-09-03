import React from 'react';
import mobileImage from '../../styles/images/1.png';
import './styles/MobileImageContent.scss';

const MobileImageContent = () => {
    return (
        <div styleName="mobile-image">
            <img src={mobileImage} loading="lazy" />
        </div>
    );
};

export default MobileImageContent;
