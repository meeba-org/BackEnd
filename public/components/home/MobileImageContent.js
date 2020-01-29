import React, {Component} from 'react';
import mobileImage from '../../styles/images/1.png';
import '../../styles/MobileImageContent.scss';

class MobileImageContent extends Component {
    render() {
        return (
            <div styleName="mobile-image">
                <img src="https://www.istoreil.co.il/media/catalog/product/cache/1/image/1000x/0dc2d03fe217f8c83829496872af24a0/i/p/iphone_11_pro_iphone_11_pro_max_mg.jpg" />
            </div>
        );
    }
}

MobileImageContent.propTypes = {};
MobileImageContent.defaultProps = {};

export default MobileImageContent;
