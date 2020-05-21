import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import React, {useState} from 'react';
import "../../styles/Workplace.scss";

const Workplace = ({workplace, onDelete, onUpdate}) => {
    const [hover, setHover] = useState(false);

    return (
        <Grid styleName="container" container spacing={2} onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
            <Grid item xs={3} styleName="name">
                <Link onClick={onUpdate}>{workplace.name}</Link>
            </Grid>
            <Grid item xs={2}>
                {hover &&
                <Tooltip title="מחיקה" placement="top">
                    <IconButton styleName='icon' onClick={onDelete}><Delete fontSize="small"/></IconButton>
                </Tooltip>
                }
            </Grid>
        </Grid>
    );
};

export default Workplace;
