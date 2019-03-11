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

const styles = {
    listItem: {
        textAlign: "right",
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

    render() {
        const {data, onDoubleClick, onClick, classes, selectMode} = this.props;

        return (
            <ListItem classes={{root: selectMode ? classes.listItemSelectionMode : classes.listItem}} button onMouseEnter={this.onMouseEnter}
                      onMouseLeave={this.onMouseLeave}
                      onDoubleClick={() => onDoubleClick(data)}
                      onClick={() => onClick(data)}
            >
                <ListItemText primary={
                    <Grid container spacing={8}>
                        <Grid item xs={2}>
                            {data.title}
                        </Grid>
                        {this.state.hover && !selectMode &&
                        <Grid item xs={3}>
                            <Tooltip title="הגדרות נוספות" placement="top">
                                <IconButton className={styles["elem"]}
                                            onClick={(e) => this.onEdit(e, data)}><SettingsIcon/></IconButton>
                            </Tooltip>
                            <Tooltip title="מחיקה" placement="top">
                                <IconButton onClick={(e) => this.onDelete(e, data)}><DeleteIcon/></IconButton>
                            </Tooltip>
                        </Grid>
                        }
                    </Grid>
                }/>
            </ListItem>
        );
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
};

export default withStyles(styles)(Task);

