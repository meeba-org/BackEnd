'use strict';

import React from "react";
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';

const styleSheet = createStyleSheet('SideBar', theme => ({
    listFull: {
        width: 'auto',
        flex: 'initial',
    },
}));

class SideBar extends React.Component {

    render() {
        const classes = this.props.classes;

        return (
            <div>
                <List className={classes.listFull} disablePadding>
                    <div>
                        <ListItem button>
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
                        <ListItem button>
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

export default withStyles(styleSheet)(SideBar);

