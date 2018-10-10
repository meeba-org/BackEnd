/**
 * Created by Chen on 16/07/2017.
 */

import React from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/EmployeesList.scss";
import PropTypes from 'prop-types';
import Employee from "./Employee";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import Field from "redux-form/es/Field";
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
        const {fields, showMobileAppModal, showEmployeeDialog} = this.props;
        return (
            <Card>
                <CardHeader title="עובדים"/>

                <CardContent className={styles["card-content"]}>

                    <div className={styles["controls-line"]}>
                        <Tooltip title="הוספת עובד" placement="top">
                            <Button className={styles["action-button"]} variant="raised" color="primary"
                                    onClick={this.onCreate}><AddIcon/></Button>
                        </Tooltip>
                        <Tooltip title="לינק לאפליקציית העובד" placement="top">
                            <Button className={styles["action-button"]} variant="raised" color="primary"
                                    onClick={() => showMobileAppModal()}><Icon>mobile_screen_share</Icon></Button>
                        </Tooltip>
                    </div>
                    <Divider className={styles["divider"]}/>
                        {fields && fields.length > 0 &&
                    <Grid className={styles["header"]} container spacing={24}>
                        <Grid item xs={6} sm={3}>שם</Grid>
                        <Grid item xs={6} sm={2} className={styles["header-item"]}>ת.ז.</Grid>
                        <Grid item xs={6} sm={1} className={styles["header-item"]}>שכר לשעה</Grid>
                        <Grid item xs={6} sm={2} className={styles["header-item"]}>נסיעות</Grid>
                    </Grid>
                    }
                    {fields && fields.map((employeeIndex, index) =>
                        (<Fade key={index}>
                            <Field component={Employee} name={employeeIndex} key={index}
                                   onDelete={() => this.onDelete(fields, index)}
                                   onUpdate={(employee) => this.onUpdate(employee)}
                                   showEmployeeDialog={showEmployeeDialog}
                            />
                        </Fade>)
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
    showMobileAppModal: PropTypes.func.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
};

export default CSSModules(EmployeesList, styles);

