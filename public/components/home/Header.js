import React, {Component} from 'react';
import styles from "../../styles/Header.scss";
import CSSModules from "react-css-modules/dist/index";
import {AppBar, Button, IconButton, Toolbar, Typography} from "material-ui";
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import {ArrowBack} from "material-ui-icons";
import PropTypes from 'prop-types';
import playStoreImage from '../../styles/images/playStore.svg';
import appStoreImage from '../../styles/images/appStore.svg';
import facebookImage from '../../styles/images/facebook.png';

class Header extends Component {
    render() {
        let {setLoginDialogVisibility} = this.props;
        return (
            <div id="header">
                <AppBar position="fixed" className="app-bar">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <AccessTimeIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">
                            מיבא
                        </Typography>
                        <div className="right-buttons-group">
                            <Button href="#header" color="contrast">בית</Button>
                            <Button href="#features" color="contrast">איך זה עובד?</Button>
                            <Button color="contrast" href="https://m.me/meebaOnFace" target="_blank">
                                צור קשר ב-
                                <img src={facebookImage} />
                            </Button>
                        </div>
                        <div className="left-buttons-group">
                            <Button color="contrast" onClick={() => setLoginDialogVisibility(true)}>כניסה</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div id="content">
                    <div id="middle-content">

                        <div className="title">
                            <div className="title-text">
                                מיבא
                            <img src="https://i.imgur.com/WCg0FBl.png" />
                            </div>
                        </div>
                        <hr/>
                        <div className="lower-middle-content">
                            <div className="sub-title">
                                שעון נוכחות וחישוב שכר לעובדים שעתיים
                            </div>
                            <Button className="login-button" raised color="primary"
                                    onClick={() => setLoginDialogVisibility(true)}>
                                <span>כניסה</span>
                                <ArrowBack style={{"paddingTop": "5px"}}/>
                            </Button>

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
