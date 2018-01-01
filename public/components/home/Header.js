import React, {Component} from 'react';
import styles from "../../styles/Header.scss";
import CSSModules from "react-css-modules/dist/index";
import {AppBar, Button, IconButton, Toolbar, Typography} from "material-ui";
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import {ArrowBack} from "material-ui-icons";

class Header extends Component {
    render() {
        return (
            <div id="header">
                <AppBar position="static" className="app-bar">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <AccessTimeIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">
                            מיבא
                        </Typography>
                        <div className="right-buttons-group">
                            <Button color="contrast">בית</Button>
                        </div>
                        <div className="left-buttons-group">
                            <Button color="contrast" onClick={() => this.setLoginDialogVisibility(true)}>כניסה</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div id="content">
                    <div id="middle-content">

                        <div className="title">מיבא</div>
                        <hr/>
                        <div className="sub-title">
                            שעון נוכחות וחישוב שכר לעובדים שעתיים
                        </div>
                        <Button className="login-button" raised color="primary" onClick={() => this.setLoginDialogVisibility(true)}>
                            <span>כניסה</span>
                            <ArrowBack />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {};
Header.defaultProps = {};

export default CSSModules(Header, styles);
