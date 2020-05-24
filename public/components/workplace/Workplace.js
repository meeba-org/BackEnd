import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import {Edit} from "@material-ui/icons";
import Delete from "@material-ui/icons/Delete";
import React, {useState} from 'react';
import "../../styles/Workplace.scss";

const Workplace = ({workplace, onDelete, onUpdate}) => {
    const [hover, setHover] = useState(false);

    return (
        <Grid styleName="container" container spacing={2} onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
            <Grid item xs={5} styleName="name">
                <div onClick={onUpdate}>{workplace.name}</div>
            </Grid>
            <Grid item xs={2}>
                {hover &&
                <Box display="flex" flexDirection="row">
                    <Tooltip title="עריכה" placement="top">
                        <IconButton styleName="icon" onClick={onUpdate}><Edit fontSize="small"/></IconButton>
                    </Tooltip>
                    <Tooltip title="מחיקה" placement="top">
                        <IconButton styleName="icon" onClick={onDelete}><Delete fontSize="small"/></IconButton>
                    </Tooltip>
                </Box>
                }
            </Grid>
        </Grid>
    );
};

export default Workplace;
