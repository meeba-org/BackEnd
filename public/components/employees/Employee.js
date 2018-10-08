import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import CSSModules from "react-css-modules";
import scssStyles from "../../styles/Employees.scss";
import Edit from "../../../node_modules/@material-ui/icons/Edit";

const styles = {
    root: {
        display: "block"
    },
    switchRoot: {
        direction: "ltr"
    },
    switchChecked: {
        transform: "translateX(20px)"
    },

};

class Employee extends React.Component {

    state = {
        hover: false
    };

    onUpdate(e, name) {
        let {input} = this.props;

        let employee = {
            ...input.value,
            [name]: e.target.value,
        };

        input.onChange(employee);
    }

    handleTransportPayPerChange(e) {
        let {input, onUpdate} = this.props;

        let employee = {
            ...input.value,
            transportPaymentPer: e.target.checked ? 1 : 0,
        };

        input.onChange(employee);
        onUpdate(employee);
    }

    onBlur = () => {
        let {input, onUpdate} = this.props;

        onUpdate(input.value);
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    render() {
        let {input, onDelete, classes, showEmployeeDialog} = this.props;
        return (
                <Grid container spacing={24} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <Grid item xs={6} sm={2}>
                        <Input value={input.value.fullName} placeholder="שם"
                               onChange={(e) => this.onUpdate(e, "fullName")}
                               onBlur={this.onBlur}
                        />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Input value={input.value.uid} placeholder="ת.ז."
                               onChange={(e) => this.onUpdate(e, "uid")}
                               onBlur={this.onBlur}
                               classes={{root: classes.root}}
                        />
                    </Grid>
                    <Grid item xs={6} sm={1}>
                        <Input value={input.value.hourWage} placeholder="שכר שעתי"
                               onChange={(e) => this.onUpdate(e, "hourWage")}
                               onBlur={this.onBlur}
                               classes={{root: classes.root}}
                        />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Input value={input.value.transportation} placeholder="נסיעות"
                               onChange={(e) => this.onUpdate(e, "transportation")}
                               onBlur={this.onBlur}
                               classes={{root: classes.root}}
                        />
                        <div>
                        </div>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        {this.state.hover &&
                        <div>
                            <Tooltip title="עריכה" placement="top">
                                <IconButton className={styles["elem"]} onClick={showEmployeeDialog}><Edit/></IconButton>
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
};

export default withStyles(styles)(CSSModules(Employee, scssStyles));

