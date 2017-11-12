'use strict';
import React from "react";
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {withTheme} from 'material-ui/styles';

class SideBar extends React.Component {

    constructor(props) {
        super(props);

        const {router} = this.props;

        this.state = {
            items : [
                {
                    text: "מצב משמרת",
                    url: "/dashboard/report/live",
                },
                {
                    text: "דו\"ח חודשי",
                    url: "/dashboard/report/monthly"
                },
                {
                    text: "דו\"ח יומי",
                    url: "/dashboard/report/daily"
                },
                {
                    text: "עובדים",
                    url: "/dashboard/employees"
                },
                {
                    text: "פרופיל משתמש",
                    url: "/dashboard/user"
                },
                {
                    text: "יצוא לאקסל",
                    url: "/dashboard/report/excel",
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
        const {theme} = this.props;

        return (
            <div>
                <List>
                    <div>
                        {this.state.items.map((item, index) =>
                        <ListItem key={index} button onTouchTap={() => this.updateRoute(item, index)}
                                  disabled={item.disabled}
                                  style={{ backgroundColor: item.selected ? theme.palette.text.divider : 'transparent'}}
                        >
                            <ListItemIcon>
                                <KeyboardArrowLeft />
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
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
};

export default withRouter(withTheme()(SideBar));

