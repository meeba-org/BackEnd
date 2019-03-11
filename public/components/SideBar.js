'use strict';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from "@material-ui/core/es/SwipeableDrawer/SwipeableDrawer";
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Assessment from '@material-ui/icons/Assessment';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DateRange from '@material-ui/icons/DateRange';
import ListIcon from '@material-ui/icons/List';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from "react";
import {IfAnyGranted} from "react-authorization";
import CSSModules from "react-css-modules";
import {withRouter} from 'react-router';
import * as ERoles from "../helpers/ERoles";
import CSSModulesStyles from '../styles/SideBar.scss';

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

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        const {router} = props;

        this.state = {
            items: [
                {
                    text: "מצב משמרת",
                    url: "/dashboard/report/live",
                    allowedRoles: [ERoles.COMPANY_MANAGER, ERoles.SHIFT_MANAGER],
                    icon: <AssignmentTurnedIn/>
                },
                {
                    text: "דו\"ח חודשי",
                    url: "/dashboard/report/monthly",
                    allowedRoles: [ERoles.COMPANY_MANAGER],
                    icon: <Assessment/>
                },
                {
                    text: "דו\"ח יומי",
                    url: "/dashboard/report/daily",
                    allowedRoles: [ERoles.COMPANY_MANAGER],
                    icon: <DateRange/>
                },
                {
                    text: "עובדים",
                    url: "/dashboard/employees",
                    allowedRoles: [ERoles.COMPANY_MANAGER, ERoles.SHIFT_MANAGER],
                    icon: <PermContactCalendar/>
                },
                {
                    text: "הגדרות",
                    url: "/dashboard/settings",
                    allowedRoles: [ERoles.COMPANY_MANAGER],
                    icon: <SettingsApplications/>
                },
            ],
        };

        this.state.items.forEach(item => {
            // Setting the selected menu according the url
            if (item.url === router.location.pathname)
                item.selected = true;
        });
    }

    componentDidUpdate(prevProps) {
        const {isTasksFeatureEnable} = this.props;
        const {items} = this.state;

        let modifiedItems = [...items];

        if (isTasksFeatureEnable !== prevProps.isTasksFeatureEnable) {
            if (isTasksFeatureEnable) {
                // Insert task item in the 4th place
                modifiedItems.splice(3, 0, {
                    text: 'דו"ח משימות',
                    url: "/dashboard/report/tasks",
                    allowedRoles: [ERoles.COMPANY_MANAGER, ERoles.SHIFT_MANAGER],
                    icon: <ListIcon/>
                });
            } else {
                modifiedItems.splice(3, 1);
            }
            this.setState({items: modifiedItems});
        }
    }

    updateRoute(item, index) {
        let {router, isDesktop, toggleSideBar} = this.props;
        router.push(item.url);

        if (!isDesktop)
            toggleSideBar();

        this.setSelected(index);
    }

    setSelected(newIndex) {
        let items = this.state.items;
        items.forEach(item => item.selected = false); // set selected=false for all items
        items[newIndex].selected = true;

        this.setState({items});
    }

    render() {
        const {classes, userRole, isDesktop, open, toggleSideBar} = this.props;
        let {items} = this.state;
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
                    anchor="right"
            >
                    <div className={CSSModulesStyles["drawer-header"]}
                         onClick={toggleSideBar}>
                        <IconButton>
                            {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {items.map((item, index) =>
                            (<IfAnyGranted key={index} expected={item.allowedRoles} actual={[userRole]}>
                                <ListItem button onClick={() => this.updateRoute(item, index)}
                                          disabled={item.disabled}
                                          classes={{
                                              root: classes.root
                                          }}
                                          style={{
                                              backgroundColor: item.selected ? "rgba(0, 0, 0, 0.10)" : 'transparent',
                                          }}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} style={{paddingRight: "24px"}}/>
                                </ListItem>
                            </IfAnyGranted>)
                        )}
                    </List>
            </SwipeableDrawer>
        );
    }
}

SideBar.propTypes = {
    router: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    userRole: PropTypes.string,
    classes: PropTypes.object,
    isDesktop: PropTypes.bool.isRequired,
    isTasksFeatureEnable: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
};

export default withRouter(withTheme()(CSSModules(withStyles(styles, {withTheme: true})(SideBar)), CSSModulesStyles));
