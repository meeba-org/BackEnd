/**
 * Created by Chen on 16/07/2017.
 */

import React, {Fragment} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/EmployeesList.scss";
import PropTypes from 'prop-types';
import Employee from "./Employee";
import {Button, Card, CardContent, CardHeader, Divider, Grid, Tooltip} from "@material-ui/core";
import {Field} from "redux-form";
import AddIcon from '@material-ui/icons/Add';
import NoData from "../NoData";
import Fade from "../Fade";

class EmployeesList extends React.Component {

    constructor(props) {
        super(props);
    }

    onCreate = () => {
        this.props.onCreate({});
    };

    onUpdate(employee) {
        this.props.onUpdate(employee);
    }

    onDelete(fields, index) {
        let employeeToDelete = fields.get(index);
        this.props.onDelete(employeeToDelete);
    }

    render() {
        const {fields} = this.props;
        return (
            <Card>
                <CardHeader title="עובדים"/>

                <CardContent className={styles["card-content"]}>

                    <div className={styles["controls-line"]}>
                        <Tooltip title="הוספת עובד" placement="top">
                            <Button className={styles["action-button"]} variant="raised" color="primary"
                                    onClick={this.onCreate}><AddIcon/></Button>
                        </Tooltip>
                    </div>
                    <Divider className={styles["divider"]}/>
                        {fields && fields.length > 0 &&
                    <Grid className={styles["header"]} container spacing={24}>
                        <Grid item xs={12} sm={3}>שם</Grid>
                        <Grid item xs={12} sm={2}>ת.ז.</Grid>
                        <Grid item xs={12} sm={1}>שכר לשעה</Grid>
                        <Grid item xs={12} sm={1}>נסיעות</Grid>
                    </Grid>
                    }
                    {fields && fields.map((employeeIndex, index) =>
                        <Fade key={index}>
                            <Field component={Employee} name={employeeIndex} key={index}
                                   onDelete={() => this.onDelete(fields, index)}
                                   onUpdate={(employee) => this.onUpdate(employee)}/>
                        </Fade>
                    )}
                    {(!fields || (fields.length == 0)) &&
                    <NoData text="אין עובדים - בוא ננסה להוסיף!"/>
                    }


                </CardContent>
            </Card>
        );
    }
}

EmployeesList.propTypes = {
    fields: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CSSModules(EmployeesList, styles);

