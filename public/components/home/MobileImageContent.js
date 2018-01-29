import React, {Component} from 'react';
import mobileImage from '../../styles/images/1.png';
import styles from '../../styles/MobileImageContent.scss';
import CSSModules from "react-css-modules";

class MobileImageContent extends Component {
    render() {
        return (
            <div className="mobile-image">
                <img src={mobileImage}/>
            </div>
        );
    }
}

MobileImageContent.propTypes = {};
MobileImageContent.defaultProps = {};

export default CSSModules(MobileImageContent, styles);