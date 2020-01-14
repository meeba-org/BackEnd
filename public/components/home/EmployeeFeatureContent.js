import React, {Component} from 'react';
import styles from '../../styles/EmployeeFeatureContent.scss';
import mobileImage from '../../styles/images/1.png';
import appStoreImage from '../../styles/images/appStore.svg';
import playStoreImage from '../../styles/images/playStore.svg';

class EmployeeFeatureContent extends Component {
    render() {
        return (
            <div styleName="employee-content">
                <div styleName="employee-content-container">
                    <div styleName="mobile-sc">
                        <img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src={mobileImage}/>
                    </div>
                    <div styleName="badges">
                        <div styleName="badge">
                            <a target="_blank"
                               href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                                <img alt=" Google Play כעת ב-"
                                     src={playStoreImage}/>
                            </a>
                        </div>
                        <div styleName="badge">
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

export default EmployeeFeatureContent;
