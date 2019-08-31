import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import scssStyles from "../../styles/Employees.scss";
import Button from "@material-ui/core/Button";
import withStyles from '@material-ui/core/styles/withStyles';
import CSSModules from "react-css-modules";
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
    root: {
        display: "flex",
        margin: "10px"
    },
    switchRoot: {
        direction: "ltr"
    },
    switchChecked: {
        transform: "translateX(20px)"
    },
    error: {
        color: "red",
        paddingTop: "6px",
        textAlign: "center"
    }
};

class EmployeeMobile extends React.Component {

    showEmployeeDialog = () => {
        let {showEmployeeDialog, input} = this.props;

        showEmployeeDialog(input.value, (editedEmployee) => input.onChange(editedEmployee));
    };

    render() {
        let {input, onDelete, classes, onBlur, onUpdate, index, error, isLimited} = this.props;
        return (
                <Grid container className={scssStyles[index % 2 === 0 ? "odd" : "even" ]}>
                    <Grid item xs={12}>
                        <Input value={input.value.fullName} placeholder="שם"
                               onChange={(e) => onUpdate(e, "fullName")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               disabled={isLimited}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input value={input.value.uid} placeholder="ת.ז."
                               onChange={(e) => onUpdate(e, "uid")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               disabled={isLimited}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input value={input.value.hourWage} placeholder="שכר שעתי"
                               onChange={(e) => onUpdate(e, "hourWage")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               endAdornment={<InputAdornment position="end">לשעה</InputAdornment>}
                               disabled={isLimited}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input value={input.value.transportation} placeholder="נסיעות"
                               onChange={(e) => onUpdate(e, "transportation")}
                               onBlur={onBlur}
                               classes={{root: classes.root}}
                               endAdornment={<InputAdornment position="end">{input.value.transportPaymentPer === 0 ? "למשמרת" : "חודשי"}</InputAdornment>}
                               disabled={isLimited}
                        />
                    </Grid>
                    {error &&
                    <Grid item xs={12}>
                        <div className={classes.error}>{error}</div>
                    </Grid>
                    }
                    <Grid item xs={12} className={scssStyles["buttons-container"]} >
                            <Button color="primary" onClick={this.showEmployeeDialog} disabled={isLimited}>
                                <SettingsIcon />
                            </Button>
                            <Button color="primary" onClick={onDelete}>
                                <DeleteIcon />
                            </Button>
                    </Grid>
                </Grid>
            );
    }
}

EmployeeMobile.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default withStyles(styles)(CSSModules(EmployeeMobile, scssStyles));

