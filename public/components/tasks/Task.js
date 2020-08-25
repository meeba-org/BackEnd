import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {withStyles} from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import React, {useState} from 'react';
import ETaskType from "../../../models/ETaskType";
import "../../styles/Task.scss";

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


const Task = ({data, onDoubleClick, onClick, onDelete, onEdit, classes, selectMode, isLimited}) => {
    
    const [hover, setHover] = useState(false);

    const onMouseEnter = () => setHover(true);

    const onMouseLeave = () => setHover(false);

    const handleDelete = (e, data) => {
        e.stopPropagation();
        onDelete(data);
    };

    const handleEdit = (e, data) => {
        e.stopPropagation();
        onEdit(data);
    };

    let isPredefined = data => data.type !== ETaskType.REGULAR;
    const enableOptions = !selectMode && !isPredefined(data);

    return (
        <Grid container onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Grid item xs={9}>
                <ListItem classes={{root: selectMode ? classes.listItemSelectionMode : classes.listItem}} button
                          onDoubleClick={() => onDoubleClick(data)}
                          onClick={() => onClick(data)}
                          disabled={isLimited}
                >
                    <ListItemText
                        primaryTypographyProps={{color: isPredefined(data) ? "primary" : "inherit"}}
                        primary={
                            <div styleName="line">
                                <div styleName="name">{data.title}</div>
                                {data.isInnovative &&
                                <Tooltip title={"הרשות לחדשנות"} placement={"top"}>
                                    <div><EmojiObjectsOutlinedIcon color="secondary"/></div>
                                </Tooltip>
                                }
                            </div>
                        }/>
                </ListItem>
            </Grid>
            {hover && enableOptions &&
            <Grid item xs={3}>
                <Tooltip title="הגדרות נוספות" placement="top">
                    <IconButton styleName="elem"
                                disabled={isLimited}
                                onClick={(e) => handleEdit(e, data)}><EditIcon/></IconButton>
                </Tooltip>
                <Tooltip title="מחיקה" placement="top">
                    <IconButton onClick={(e) => handleDelete(e, data)}><DeleteIcon/></IconButton>
                </Tooltip>
            </Grid>
            }

        </Grid>
    );
};

export default withStyles(styles)(Task);

