import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import CSSModules from "react-css-modules";
import scssStyles from "../../styles/Employees.scss";
import Settings from '@material-ui/icons/Settings';

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
        let {showEmployeeDialog, input} = this.props;

        showEmployeeDialog(input.value, (editedEmployee) => input.onChange(editedEmployee));
    };

    render() {
        let {input, onDelete, classes, onBlur, onUpdate, error} = this.props;
        return (
                <Grid container spacing={24} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <Grid item sm={3}>
                        <Input value={input.value.fullName} placeholder="שם"
                               onChange={(e) => onUpdate(e, "fullName")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <Input value={input.value.uid} placeholder="ת.ז."
                               onChange={(e) => onUpdate(e, "uid")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                        />
                    </Grid>
                    <Grid item sm={1}>
                        <Input value={input.value.hourWage} placeholder="שכר שעתי"
                               onChange={(e) => onUpdate(e, "hourWage")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <Input value={input.value.transportation} placeholder="נסיעות"
                               onChange={(e) => onUpdate(e, "transportation")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               endAdornment={<InputAdornment position="end">{input.value.transportPaymentPer === 0 ? "למשמרת" : "חודשי"}</InputAdornment>}
                        />
                    </Grid>
                    {error &&
                    <Grid item sm={2}>
                        <div className={classes.error}>{error}</div>
                    </Grid>
                    }
                    <Grid item sm={2}>
                        {this.state.hover &&
                        <div>
                            <Tooltip title="הגדרות נוספות" placement="top">
                                <IconButton className={styles["elem"]} onClick={this.showEmployeeDialog}><Settings/></IconButton>
                            </Tooltip>
                            <Tooltip title="מחיקה" placement="top">
                                <IconButton onClick={onDelete}><DeleteIcon/></IconButton>
                            </Tooltip>
                        </div>
                        }
                    </Grid>
                </Grid>
        );
    }
}

Employee.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default withStyles(styles)(CSSModules(Employee, scssStyles));

