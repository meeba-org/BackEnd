import React, {Component} from 'react';
import playStoreImage from '../../styles/images/playStore.svg';
import appStoreImage from '../../styles/images/appStore.svg';
import mobileImage from '../../styles/images/1.png';
import styles from '../../styles/EmployeeFeatureContent.scss';
import CSSModules from "react-css-modules";

class EmployeeFeatureContent extends Component {
    render() {
        return (
            <div id="employee-content">
                <div id="employee-content-container">
                    <div id="mobile-sc">
                        <img src={mobileImage}/>
                    </div>
                    <div className="badges">
                        <div className="badge">
                            <a target="_blank"
                               href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                                <img alt=" Google Play כעת ב-"
                                     src={playStoreImage}/>
                            </a>
                        </div>
                        <div className="badge">
                            <a target="_blank"
                               href="https://itunes.apple.com/il/app/%D7%9E%D7%99%D7%91%D7%90/id1329551700?mt=8">
                                <img alt=" Apple Store כעת ב-"
                                     src={appStoreImage}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EmployeeFeatureContent.propTypes = {};
EmployeeFeatureContent.defaultProps = {};

export default CSSModules(EmployeeFeatureContent, styles);
