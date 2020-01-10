import Assessment from '@material-ui/icons/Assessment';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import PropTypes from 'prop-types';
import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import * as ERoles from "../helpers/ERoles";
import SideBar from "./SideBar";

class SideBarContainer extends Component {

    state = {
        items: this.generateItems(false)
    };

    setSelected(newIndex) {
        let items = this.state.items;
        items.forEach(item => item.selected = false); // set selected=false for all items
        items[newIndex].selected = true;

        this.setState({items});
    }

    updateRoute = (item, index) => {
        let {history, isDesktop, toggleSideBar} = this.props;
        history.push(item.url);

        if (!isDesktop)
            toggleSideBar();

        this.setSelected(index);
    };

    generateItems() {
        const {location} = this.props;

        let items = [
            {
                text: "מצב משמרת",
                url: "/dashboard/live",
                allowedRoles: [ERoles.COMPANY_MANAGER, ERoles.SHIFT_MANAGER],
                icon: <AssignmentTurnedIn/>
            },
            {
                text: "משמרות",
                url: "/dashboard/report",
                allowedRoles: [ERoles.COMPANY_MANAGER],
                icon: <Assessment/>
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

        items.forEach(item => {
            // Setting the selected menu according the url
            if (item.url === location.pathname)
                item.selected = true;
        });

        return items;
    }

    render() {
        const {userRole, isDesktop, open, toggleSideBar} = this.props;
        let {items} = this.state;

        return (
            <SideBar
                items={items}
                isDesktop={isDesktop}
                userRole={userRole}
                open={open}
                toggleSideBar={toggleSideBar}
                updateRoute={this.updateRoute}
            />
        );
    }
}

SideBarContainer.propTypes = {
    history: PropTypes.object.isRequired,
    userRole: PropTypes.string,
    classes: PropTypes.object,
    isDesktop: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
};

export default withRouter(SideBarContainer);
