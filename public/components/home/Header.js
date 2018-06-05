import React, {Component} from 'react';
import styles from "../../styles/Header.scss";
import CSSModules from "react-css-modules/dist/index";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {ArrowBack} from "@material-ui/icons";
import PropTypes from 'prop-types';
import playStoreImage from '../../styles/images/playStore.svg';
import appStoreImage from '../../styles/images/appStore.svg';
import facebookImage from '../../styles/images/facebook.png';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class Header extends Component {
    render() {
        let {setLoginDialogVisibility} = this.props;
        return (
            <div id="header">
                <AppBar position="fixed" styleName="app-bar">
                    <Toolbar>
                        <IconButton  aria-label="Menu" color="inherit">
                            <AccessTimeIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">
                            מיבא
                        </Typography>
                        <div styleName="right-buttons-group">
                            <Button href="#header" color="inherit">בית</Button>
                            <Button href="#features" color="inherit">איך זה עובד?</Button>
                            <Button href="https://www.facebook.com/meebaOnFace/" color="inherit" target="_blank">
                                <img src={facebookImage} />
                            </Button>
                        </div>
                        <div styleName="left-buttons-group">
                            <Button color="inherit" onClick={() => setLoginDialogVisibility(true)}>כניסה</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div id="content">
                    <div id="middle-content">
                        <div styleName="title">
                            <div styleName="title-text">
                                מיבא
                                {/*<img src={betaImage} />*/}
                            </div>
                        </div>
                        <hr/>
                        <div styleName="lower-middle-content">
                            <div styleName="sub-title">
                                שעון נוכחות חינמי
                            </div>
                            <Button styleName="login-button" variant="raised" color="primary"
                                    onClick={() => setLoginDialogVisibility(true)}>
                                <span>כניסה</span>
                                <ArrowBack style={{"paddingTop": "5px"}}/>
                            </Button>

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
                    <a id="bottom-content" href="#features">
                        <div styleName="continue-scrolling-indication">
                            המשך גלילה
                        </div>
                        <div styleName="arrow">
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
