import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import CSSModules from "react-css-modules";
import styles from '../styles/AppBar.scss';

function MeebaAppBar() {
    return (
        <div id="app-bar">
            <AppBar position="static">
                <Toolbar id="toolbar">
                    <IconButton color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit">מיבא</Typography>
                    <div className="login">
                        <Button color="contrast">כניסה</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

MeebaAppBar.propTypes = {
};

export default CSSModules(MeebaAppBar, styles);

