import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import "../../styles/Employees.scss";

const styles = {
    root: {
        display: "flex"
    },
    switchRoot: {
        direction: "ltr"
    },
    switchChecked: {
        transform: "translateX(20px)"
    },
    error: {
        color: "red",
        paddingTop: "6px"
    },
    options: {
        display: "flex",
        justifyContent: "space-evenly"
    }
};

class Employee extends React.Component {

    state = {
        hover: false
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    showEmployeeDialog = () => {
        let {showEmployeeDialog, employee} = this.props;

        showEmployeeDialog(employee);
    };

    render() {
        let {employee, onDelete, classes, onBlur, onUpdate, error, isLimited} = this.props;
        return (
                <Grid container spacing={2} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <Grid item sm={3}>
                        <Input value={employee.fullName} placeholder="שם"
                               onChange={(e) => onUpdate(e, "fullName")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               disabled={isLimited}
                               inputProps={{"data-hj-whitelist": ""}}
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <Input value={employee.uid} placeholder="ת.ז."
                               onChange={(e) => onUpdate(e, "uid")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               disabled={isLimited}
                               inputProps={{"data-hj-whitelist": ""}}
                        />
                    </Grid>
                    <Grid item sm={1}>
                        <Input value={employee.hourWage} placeholder="שכר שעתי"
                               onChange={(e) => onUpdate(e, "hourWage")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               disabled={isLimited}
                               inputProps={{"data-hj-whitelist": ""}}
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <Input value={employee.transportation} placeholder="נסיעות"
                               onChange={(e) => onUpdate(e, "transportation")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
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
                        <div className={classes.error}>{error}</div>
                    </Grid>
                    }
                    <Grid item sm={2} className={classes.options}>
                        {this.state.hover &&
                        <Fragment>
                            {!isLimited &&
                            <Tooltip title="הגדרות נוספות" placement="top">
                                <IconButton styleName="elem" onClick={this.showEmployeeDialog}><Settings/></IconButton>
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
    }
}

Employee.propTypes = {
    employee: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
    error: PropTypes.string,
    isLimited: PropTypes.bool,
};

export default withStyles(styles)(Employee);

