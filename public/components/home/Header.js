import React, {Component} from 'react';
import styles from "../../styles/Header.scss";
import CSSModules from "react-css-modules/dist/index";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowBack from "@material-ui/icons/ArrowBack";
import PropTypes from 'prop-types';
import playStoreImage from '../../styles/images/playStore.svg';
import appStoreImage from '../../styles/images/appStore.svg';
import facebookImage from '../../styles/images/facebook.png';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class Header extends Component {
    render() {
        let {setLoginDialogVisibility} = this.props;
        return (
            <div id="header1" styleName="header">
                <AppBar position="fixed" className={styles["app-bar"]}>
                    <Toolbar>
                        <IconButton  aria-label="Menu" color="inherit">
                            <AccessTimeIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">
                            מיבא
                        </Typography>
                        <div className={styles["right-buttons-group"]}>
                            <Button href="#header1" color="inherit">בית</Button>
                            <Button href="#features1" color="inherit">איך זה עובד?</Button>
                            <Button href="https://www.facebook.com/meebaOnFace/" color="inherit" target="_blank">
                                <img src={facebookImage} />
                            </Button>
                        </div>
                        <div>
                            <Button color="inherit" onClick={() => setLoginDialogVisibility(true)}>כניסה</Button>
                        </div>
                    </Toolbar>
                </AppBar>
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
                            <Button className={styles["login-button"]} variant="raised" color="primary"
                                    onClick={() => setLoginDialogVisibility(true)}>
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

Header.propTypes = {
    setLoginDialogVisibility: PropTypes.func.isRequired
};
Header.defaultProps = {};

export default CSSModules(Header, styles);
