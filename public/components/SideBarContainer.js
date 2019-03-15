'use strict';
import Assessment from '@material-ui/icons/Assessment';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import DateRange from '@material-ui/icons/DateRange';
import LabelIcon from '@material-ui/icons/Label';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import PropTypes from 'prop-types';
import React, {Component} from "react";
import {withRouter} from 'react-router';
import * as ERoles from "../helpers/ERoles";
import SideBar from "./SideBar";

class SideBarContainer extends Component {

    state = {
        items: this.generateItems(false)
    };

    componentDidUpdate(prevProps) {
        if (this.props.isTasksFeatureEnable === prevProps.isTasksFeatureEnable)
            return;

        // isTasksFeatureEnable was changed
        const {isTasksFeatureEnable} = this.props;

        const generateItems = this.generateItems(isTasksFeatureEnable);
        this.setState({items: generateItems});
    }

    setSelected(newIndex) {
        let items = this.state.items;
        items.forEach(item => item.selected = false); // set selected=false for all items
        items[newIndex].selected = true;

        this.setState({items});
    }

    updateRoute = (item, index) => {
        let {router, isDesktop, toggleSideBar} = this.props;
        router.push(item.url);

        if (!isDesktop)
            toggleSideBar();

        this.setSelected(index);
    };

    generateItems(isTasksFeatureEnable) {
        const {router} = this.props;

        let items = [
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
        ];

        if (isTasksFeatureEnable) {
            // Insert task item in the 4th place
            items.splice(3, 0, {
                text: 'דו"ח משימות',
                url: "/dashboard/report/tasks",
                allowedRoles: [ERoles.COMPANY_MANAGER, ERoles.SHIFT_MANAGER],
                icon: <LabelIcon/>
            });
        }

        items.forEach(item => {
            // Setting the selected menu according the url
            if (item.url === router.location.pathname)
            item.selected = true;
        });

        return items;
    }

    render() {
        const {userRole, isDesktop, open, toggleSideBar, isTasksFeatureEnable} = this.props;
        let {items} = this.state;

        return (
            <SideBar
                items={items}
                isDesktop={isDesktop}
                isTasksFeatureEnable={isTasksFeatureEnable}
                userRole={userRole}
                open={open}
                toggleSideBar={toggleSideBar}
                updateRoute={this.updateRoute}
            />
        );
    }
}

SideBarContainer.propTypes = {
    router: PropTypes.object.isRequired,
    userRole: PropTypes.string,
    classes: PropTypes.object,
    isDesktop: PropTypes.bool.isRequired,
    isTasksFeatureEnable: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
};

export default withRouter(SideBarContainer);
