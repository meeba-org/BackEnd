import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import styles from '../../styles/ManagerFeatureContent.scss';
import browserImage from '../../styles/images/browser.png';

class ManagerFeatureContent extends Component {
    render() {
        return (
            <div id="manager-content">
                <img src={browserImage}/>
            </div>
        );
    }
}

ManagerFeatureContent.propTypes = {};
ManagerFeatureContent.defaultProps = {};

export default CSSModules(ManagerFeatureContent, styles);
