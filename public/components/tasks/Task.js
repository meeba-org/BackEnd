import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';

const styles = {
    listItem: {
        textAlign: "right"
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

    render() {
        const {data, onAdd, onDelete, classes} = this.props;

        return (
            <ListItem classes={{root: classes.listItem}} button onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <ListItemText primary={
                    <Grid container spacing={8}>
                        <Grid item xs={2}>
                            {data.title}
                        </Grid>
                        {this.state.hover &&
                        <Grid item xs={3}>
                            <Tooltip title="הגדרות נוספות" placement="top">
                                <IconButton className={styles["elem"]}
                                            onClick={() => onAdd(data)}><SettingsIcon/></IconButton>
                            </Tooltip>
                            <Tooltip title="מחיקה" placement="top">
                                <IconButton onClick={() => onDelete(data)}><DeleteIcon/></IconButton>
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
    onAdd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,

};
Task.defaultProps = {};

export default withStyles(styles)(Task);

