import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from 'classnames';
import React, {Component} from "react";
import {IfAnyGranted} from "react-authorization";
import CSSModules from "react-css-modules";
import CSSModulesStyles from "../styles/SideBar.scss";

const drawerWidth = 200;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    root: {
        paddingRight: 0,
        textAlign: "right"
    }
});

class SideBar extends Component {

    render() {
        let {items, toggleSideBar, open, userRole, isDesktop, classes, updateRoute} = this.props;
        let variant = isDesktop ? "permanent" : "temporary";

        return (
            <SwipeableDrawer
                variant={variant}
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
                onClose={toggleSideBar}
                onOpen={toggleSideBar}
            >
                <div className={CSSModulesStyles["drawer-header"]}
                     onClick={toggleSideBar}>
                    <IconButton>
                        {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {items && items.map((item, index) =>
                        (<IfAnyGranted key={index} expected={item.allowedRoles} actual={[userRole]}>
                            <ListItem button onClick={() => updateRoute(item, index)}
                                      disabled={item.disabled}
                                      style={{
                                          backgroundColor: item.selected ? "rgba(0, 0, 0, 0.10)" : 'transparent',
                                      }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </IfAnyGranted>)
                    )}
                </List>
            </SwipeableDrawer>
        );
    }
}

SideBar.propTypes = {};
SideBar.defaultProps = {};

export default CSSModules(withStyles(styles, {withTheme: true})(SideBar), CSSModulesStyles);
