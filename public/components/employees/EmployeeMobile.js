import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React from 'react';
import "./styles/Employees.scss";

const EmployeeMobile = ({employee, showEmployeeDialog, onDelete, onBlur, onUpdate, order, error, isLimited}) => {
    return (
        <Grid container styleName={(order % 2 === 0) ? "odd" : ""}>
            <Grid item xs={12}>
                <Input value={employee.fullName} placeholder="שם"
                       onChange={(e) => onUpdate(e, "fullName")}
                       onBlur={onBlur}
                       styleName="input"
                       disabled={isLimited}
                />
            </Grid>
            <Grid item xs={12}>
                <Input value={employee.uid} placeholder="ת.ז."
                       onChange={(e) => onUpdate(e, "uid")}
                       onBlur={onBlur}
                       styleName="input"
                       disabled={isLimited}
                />
            </Grid>
            <Grid item xs={6}>
                <Input value={employee.hourWage} placeholder="שכר שעתי"
                       onChange={(e) => onUpdate(e, "hourWage")}
                       onBlur={onBlur}
                       styleName="input"
                       endAdornment={<InputAdornment position="end">לשעה</InputAdornment>}
                       disabled={isLimited}
                />
            </Grid>
            <Grid item xs={6}>
                <Input value={employee.transportation} placeholder="נסיעות"
                       onChange={(e) => onUpdate(e, "transportation")}
                       onBlur={onBlur}
                       styleName="input"
                       endAdornment={<InputAdornment position="end">{employee.transportPaymentPer === 0 ? "למשמרת" : "חודשי"}</InputAdornment>}
                       disabled={isLimited}
                />
            </Grid>
            {error &&
            <Grid item xs={12}>
                <div styleName="error">{error}</div>
            </Grid>
            }
            <Grid item xs={12} styleName="buttons-container">
                <Button color="primary" onClick={() => showEmployeeDialog(employee)} disabled={isLimited}>
                    <SettingsIcon />
                </Button>
                <Button color="primary" onClick={onDelete}>
                    <DeleteIcon />
                </Button>
            </Grid>
        </Grid>
    );
};

EmployeeMobile.propTypes = {
    employee: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default EmployeeMobile;

