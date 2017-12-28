import React, {Component} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "material-ui";
import styles from "../../styles/Home.scss";
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import CSSModules from "react-css-modules";

class Home extends Component {
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
                                <Button color="contrast">בית</Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {};
Home.defaultProps = {};

export default CSSModules(Home, styles);
