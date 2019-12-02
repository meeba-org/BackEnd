import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ETaskType from "../../../models/ETaskType";

const styles = {
    listItem: {
        textAlign: "right",
        paddingTop: "7px",
        paddingBottom: "7px",
    },
    listItemText: {
    },
    listItemSelectionMode: {
        textAlign: "right",
        paddingTop: "4px",
        paddingBottom: "4px",
    }
};

class Task extends Component {
    state = {
        hover: false
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    onDelete = (e, data) => {
        e.stopPropagation();
        this.props.onDelete(data);
    };

    onEdit = (e, data) => {
        e.stopPropagation();
        this.props.onEdit(data);
    };

    isGlobal = data => data.type === ETaskType.GLOBAL;

    render() {
        const {data, onDoubleClick, onClick, classes, selectMode, isLimited} = this.props;
        const enableOptions = !selectMode && !this.isGlobal(data);

        return (
            <Grid container onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <Grid item xs={9}>
                <ListItem classes={{root: selectMode ? classes.listItemSelectionMode : classes.listItem}} button
                          onDoubleClick={() => onDoubleClick(data)}
                          onClick={() => onClick(data)}
                          disabled={isLimited}
                >
                    <ListItemText primaryTypographyProps={{color: this.isGlobal(data) ? "primary" : "inherit"}} primary={
                        <Grid container>
                            <Grid item>
                                {data.title}
                            </Grid>
                        </Grid>
                    }/>
                </ListItem>
                </Grid>
                {this.state.hover && enableOptions &&
                <Grid item xs={3}>
                    <Tooltip title="הגדרות נוספות" placement="top">
                        <IconButton className={styles["elem"]}
                                    disabled={isLimited}
                                    onClick={(e) => this.onEdit(e, data)}><SettingsIcon/></IconButton>
                    </Tooltip>
                    <Tooltip title="מחיקה" placement="top">
                        <IconButton onClick={(e) => this.onDelete(e, data)}><DeleteIcon/></IconButton>
                    </Tooltip>
                </Grid>
                }

            </Grid>
        );
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    isLimited: PropTypes.bool
};

export default withStyles(styles)(Task);

