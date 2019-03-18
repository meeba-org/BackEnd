import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, {Component} from 'react';
import CSSModules from "react-css-modules/dist/index";
import {connect} from 'react-redux';
import {showLoginRegisterDialog} from "../../actions";
import styles from "../../styles/Header.scss";
import appStoreImage from '../../styles/images/appStore.svg';
import playStoreImage from '../../styles/images/playStore.svg';
import HomeAppBar from './HomeAppBar';

class Header extends Component {
    render() {
        const {showLoginRegisterDialog} = this.props;
        return (
            <div id="header1" styleName="header">
                <HomeAppBar/>
                <div className={styles["content"]}>
                    <div className={styles["middle-content"]}>
                        <div className={styles["title"]}>
                            <div className={styles["title-text"]}>
מיבא
                                {/*<img src={betaImage} />*/}
                            </div>
                        </div>
                        <hr/>
                        <div styleName="lower-middle-content">
                            <div className={styles["sub-title"]}>
                                שעון נוכחות חינמי
                            </div>
                            <Button className={styles["login-button"]} variant="contained" color="primary" onClick={showLoginRegisterDialog}>
                                <span>כניסה</span>
                                <ArrowBack style={{"paddingTop": "5px"}}/>
                            </Button>

                            <div className={styles["badges"]}>
                                <div className={styles["badge"]}>
                                    <a target="_blank"
                                       href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                                        <img alt=" Google Play כעת ב-"
                                             src={playStoreImage}/>
                                    </a>
                                </div>
                                <div className={styles["badge"]}>
                                    <a target="_blank"
                                       href="https://itunes.apple.com/il/app/%D7%9E%D7%99%D7%91%D7%90/id1329551700?mt=8">
                                        <img alt=" Apple Store כעת ב-"
                                             src={appStoreImage}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className={styles["bottom-content"]} href="#features1">
                        <div>
                            המשך גלילה
                        </div>
                        <div>
                            <ArrowDownIcon/>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLoginRegisterDialog: () => {dispatch(showLoginRegisterDialog());},
    };
};

export default connect(null, mapDispatchToProps)(CSSModules(Header, styles));
