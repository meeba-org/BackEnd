import React, {Component} from 'react';
import styles from "../../styles/Header.scss";
import CSSModules from "react-css-modules/dist/index";
import {AppBar, Button, IconButton, Toolbar, Typography} from "material-ui";
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import {ArrowBack} from "material-ui-icons";
import PropTypes from 'prop-types';

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
                            <Button href="#features" color="contrast">כלים</Button>
                        </div>
                        <div className="left-buttons-group">
                            <Button color="contrast" onClick={() => setLoginDialogVisibility(true)}>כניסה</Button>
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
                        <Button className="login-button" raised color="primary" onClick={() => setLoginDialogVisibility(true)}>
                            <span>כניסה</span>
                            <ArrowBack style={{"padding-top": "5px"}}/>
                        </Button>
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
