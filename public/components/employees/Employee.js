import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from 'react';
import "./styles/Employees.scss";

const Employee = ({employee, showEditEmployeeModal, onDelete, onBlur, onUpdate, error, isLimited}) => {

    const [hover, setHover] = useState(false);

    const onMouseEnter = () => setHover(true);
    const onMouseLeave = () => setHover(false);

    return (
        <Grid container spacing={2} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Grid item sm={3}>
                <Input value={employee.fullName} placeholder="שם"
                       onChange={(e) => onUpdate(e, "fullName")}
                       onBlur={onBlur}
                       styleName="input"
                       disabled={isLimited}
                       inputProps={{"data-hj-whitelist": ""}}
                />
            </Grid>
            <Grid item sm={2}>
                <Input value={employee.uid} placeholder="ת.ז."
                       onChange={(e) => onUpdate(e, "uid")}
                       onBlur={onBlur}
                       styleName="input"
                       disabled={isLimited}
                       inputProps={{"data-hj-whitelist": ""}}
                />
            </Grid>
            <Grid item sm={1}>
                <Input value={employee.hourWage} placeholder="שכר שעתי"
                       onChange={(e) => onUpdate(e, "hourWage")}
                       onBlur={onBlur}
                       styleName="input"
                       disabled={isLimited}
                       inputProps={{"data-hj-whitelist": ""}}
                />
            </Grid>
            <Grid item sm={2}>
                <Input value={employee.transportation} placeholder="נסיעות"
                       onChange={(e) => onUpdate(e, "transportation")}
                       onBlur={onBlur}
                       styleName="input"
                       inputProps={{"data-hj-whitelist": ""}}
                       endAdornment={
                           <InputAdornment position="end">
                               <Typography variant={"body2"}>
                                   {employee.transportPaymentPer === 0 ? "למשמרת" : "חודשי"}
                               </Typography>
                           </InputAdornment>
                       }
                       disabled={isLimited}
                />
            </Grid>
            {error &&
            <Grid item sm={2}>
                <div styleName="error">{error}</div>
            </Grid>
            }
            <Grid item sm={2} styleName="options">
                {hover &&
                <Fragment>
                    {!isLimited &&
                    <Tooltip title="הגדרות נוספות" placement="top">
                        <IconButton styleName="elem" onClick={() => showEditEmployeeModal(employee)}><Settings/></IconButton>
                    </Tooltip>
                    }
                    <Tooltip title="מחיקה" placement="top">
                        <IconButton onClick={onDelete}><DeleteIcon/></IconButton>
                    </Tooltip>
                </Fragment>
                }
            </Grid>
        </Grid>
    );
};

Employee.propTypes = {
    employee: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showEditEmployeeModal: PropTypes.func.isRequired,
    error: PropTypes.string,
    isLimited: PropTypes.bool,
};

export default Employee;

