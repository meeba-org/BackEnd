import React, {Component} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "material-ui";
import styles from "../../styles/Home.scss";
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import CSSModules from "react-css-modules";
import {ArrowBack} from "material-ui-icons";
import LoginRegisterContainer from "../login/LoginRegisterContainer";
import PropTypes from 'prop-types';

class Home extends Component {
    state = {
        visible: false
    };

    setLoginDialogVisibility = (visible) => {
        this.setState({visible});
    };

    render() {
        return (
            <div id="home">
                <div id="home-bg">
                    <div id="container">
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
                </div>
                <LoginRegisterContainer
                    visible={this.state.visible}
                    router={this.props.router}
                    onCancel={() => this.setLoginDialogVisibility(false)}
                />
            </div>
        );
    }
}

Home.propTypes = {
    router: PropTypes.object,
};
Home.defaultProps = {};

export default CSSModules(Home, styles);
