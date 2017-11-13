'use strict';
import React from "react";
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {withTheme} from 'material-ui/styles';
import {IfAnyGranted} from "react-authorization";
import * as ERoles from "../helpers/ERoles";

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        const {router} = this.props;

        this.state = {
            items : [
                {
                    text: "מצב משמרת",
                    url: "/dashboard/report/live",
                    allowedRoles: [ERoles.COMPANY_MANAGER, ERoles.SHIFT_MANAGER]
                },
                {
                    text: "דו\"ח חודשי",
                    url: "/dashboard/report/monthly",
                    allowedRoles: [ERoles.COMPANY_MANAGER]
                },
                {
                    text: "דו\"ח יומי",
                    url: "/dashboard/report/daily",
                    allowedRoles: [ERoles.COMPANY_MANAGER]
                },
                {
                    text: "עובדים",
                    url: "/dashboard/employees",
                    allowedRoles: [ERoles.COMPANY_MANAGER, ERoles.SHIFT_MANAGER]
                },
                {
                    text: "פרופיל משתמש",
                    url: "/dashboard/user",
                    allowedRoles: [ERoles.COMPANY_MANAGER]
                },
            ]
        };

        this.state.items.forEach(item => {
            // Setting the selected menu according the url
            if (item.url == router.location.pathname)
                item.selected = true;
        });
    }


    updateRoute(item, index) {
        let {router} = this.props;
        router.push(item.url);

        this.setSelected(index);
    }

    setSelected(newIndex) {
        let items = this.state.items;
        items.forEach(item => item.selected = false); // set selected=false for all items
        items[newIndex].selected = true;

        this.setState({ items });
    }

    render() {
        const {theme, userRole} = this.props;

        return (
            <div>
                <List>
                    <div>
                        {this.state.items.map((item, index) =>
                            <IfAnyGranted  key={index} expected={item.allowedRoles} actual={[userRole]}>
                                <ListItem button onTouchTap={() => this.updateRoute(item, index)}
                                          disabled={item.disabled}
                                          style={{ backgroundColor: item.selected ? theme.palette.text.divider : 'transparent'}}
                                >
                                    <ListItemIcon>
                                        <KeyboardArrowLeft />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItem>
                            </IfAnyGranted>
                        )}
                    </div>
                </List>
            </div>
        );
    }
}

SideBar.propTypes = {
    router: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    userRole: PropTypes.string,
};

export default withRouter(withTheme()(SideBar));

