'use strict';
import React from "react";
import {Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Assessment from '@material-ui/icons/Assessment';
import DateRange from '@material-ui/icons/DateRange';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import {IfAnyGranted} from "react-authorization";
import * as ERoles from "../helpers/ERoles";
import classNames from 'classnames';
import CSSModulesStyles from '../styles/SideBar.scss';
import CSSModules from "react-css-modules";
import {withStyles, withTheme} from '@material-ui/core/styles';

const drawerWidth = 200;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
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
});

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        const {router} = this.props;

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
                    text: "פרופיל משתמש",
                    url: "/dashboard/user",
                    allowedRoles: [ERoles.COMPANY_MANAGER],
                    icon: <SettingsApplications/>
                },
            ],
            open: true,
        };

        this.state.items.forEach(item => {
            // Setting the selected menu according the url
            if (item.url == router.location.pathname)
                item.selected = true;
        });
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    updateRoute(item, index) {
        let {router} = this.props;
        router.push(item.url);

        this.setSelected(index);
    }

    setSelected(newIndex) {
        let items = this.state.items;
        items.forEach(item => item.selected = false); // set selected=false for all items
        items[newIndex].selected = true;

        this.setState({items});
    }

    render() {
        const {classes, theme, userRole} = this.props;

        return (
            <Drawer styleName="sideBar"
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
            >
                <div>
                    <div className="drawer-header"
                         onClick={this.state.open ? this.handleDrawerClose : this.handleDrawerOpen}>
                        <IconButton>
                            {this.state.open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {this.state.items.map((item, index) =>
                            (<IfAnyGranted key={index} expected={item.allowedRoles} actual={[userRole]}>
                                <ListItem button onClick={() => this.updateRoute(item, index)}
                                          disabled={item.disabled}
                                          style={{
                                              backgroundColor: item.selected ? "rgba(0, 0, 0, 0.10)" : 'transparent',
                                              paddingTop: "10px",
                                              paddingBottom: "10px",
                                              paddingRight: 0
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
                </div>
            </Drawer>
        );
    }
}

SideBar.propTypes = {
    router: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    userRole: PropTypes.string,
    classes: PropTypes.object,
};

export default withRouter(withTheme()(CSSModules(withStyles(styles, {withTheme: true})(SideBar)), CSSModulesStyles));
