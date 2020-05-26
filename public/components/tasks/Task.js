import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ETaskType from "../../../models/ETaskType";
import "../../styles/Task.scss";
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

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

    isPredefined = data => data.type !== ETaskType.REGULAR;

    render() {
        const {data, onDoubleClick, onClick, classes, selectMode, isLimited} = this.props;
        const enableOptions = !selectMode && !this.isPredefined(data);

        return (
            <Grid container onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <Grid item xs={2}>
                    <ListItem classes={{root: selectMode ? classes.listItemSelectionMode : classes.listItem}} button
                              onDoubleClick={() => onDoubleClick(data)}
                              onClick={() => onClick(data)}
                              disabled={isLimited}
                    >
                        <ListItemText
                            primaryTypographyProps={{color: this.isPredefined(data) ? "primary" : "inherit"}}
                            primary={
                                <div styleName="line">
                                    <div styleName="name">{data.title}</div>
                                    {data.isInnovative &&
                                    <Tooltip title={"המדען הראשי"} placement={"top"}>
                                        <div><EmojiObjectsOutlinedIcon color="secondary"/></div>
                                    </Tooltip>
                                    }
                                </div>
                            }/>
                    </ListItem>
                </Grid>
                {this.state.hover && enableOptions &&
                <Grid item xs={3}>
                    <Tooltip title="הגדרות נוספות" placement="top">
                        <IconButton styleName="elem"
                                    disabled={isLimited}
                                    onClick={(e) => this.onEdit(e, data)}><EditIcon/></IconButton>
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

