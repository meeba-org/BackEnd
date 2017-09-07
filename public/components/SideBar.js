'use strict';

import React from "react";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import {withRouter} from 'react-router';

class SideBar extends React.Component {

    updateRoute(route) {
        let {router} = this.props;
        router.push(route);
    }

    render() {
        return (
            <div>
                <List>
                    <div>
                        <ListItem button onTouchTap={() => this.updateRoute("/dashboard/status")}>
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
                        <ListItem button onTouchTap={() => this.updateRoute("/dashboard/employees")}>
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
};

export default withRouter(SideBar);

