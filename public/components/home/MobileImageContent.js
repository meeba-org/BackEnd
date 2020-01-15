import React, {Component} from 'react';
import mobileImage from '../../styles/images/1.png';
import '../../styles/MobileImageContent.scss';

class MobileImageContent extends Component {
    render() {
        return (
            <div styleName="mobile-image">
                <img src={mobileImage}/>
            </div>
        );
    }
}

MobileImageContent.propTypes = {};
MobileImageContent.defaultProps = {};

export default MobileImageContent;
