'use strict';

import React from "react";
import PropTypes from 'prop-types';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { browserHistory } from 'react-router';

class SideBar extends React.Component {

    _handleTouchTap(route) {
        browserHistory.push(route);
    }

    render() {
        return (
            <div>
                <List>
                    <div>
                        <ListItem button onTouchTap={() => this._handleTouchTap("/status")}>
                            <ListItemIcon>
                                <KeyboardArrowLeft />
                            </ListItemIcon>
                            <ListItemText primary="מצב משמרת"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <KeyboardArrowLeft />
                            </ListItemIcon>
                            <ListItemText primary="דוח חודשי"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <KeyboardArrowLeft />
                            </ListItemIcon>
                            <ListItemText primary="דוח יומי"/>
                        </ListItem>
                        <ListItem button onTouchTap={() => this._handleTouchTap("/employees")}>
                            <ListItemIcon>
                                <KeyboardArrowLeft />
                            </ListItemIcon>
                            <ListItemText primary="עובדים"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <KeyboardArrowLeft />
                            </ListItemIcon>
                            <ListItemText primary="ייצוא לאקסל"/>
                        </ListItem>
                    </div>
                </List>
            </div>        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SideBar;

