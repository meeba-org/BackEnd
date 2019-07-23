/**
 * Created by Chen on 16/07/2017.
 */

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from "react-css-modules";
import Field from "redux-form/es/Field";
import {isIsraeliIdValid} from "../../helpers/utils";
import styles from "../../styles/EmployeesList.scss";
import Fade from "../Fade";
import GoPremiumNotification from "../go-premium/GoPremiumNotification";
import NoData from "../NoData";
import SearchBar from "../SearchBar";
import EmployeeContainer from "./EmployeeContainer";

class EmployeesList extends React.PureComponent {

    state = {
        employeesFilter: ""
    };

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

    validateEmployee = value => {
        if (!value || !value.uid)
            return undefined;

        if (!isIsraeliIdValid(value.uid))
            return "ת.ז. לא תקינה";
        return undefined;
    }

    filterEmployees = (result, index, fields, employeesFilter) => {
        if (!employeesFilter)
            return true;

        let employee = fields.get(index);

        if (!employee || !employee.fullName)
            return false;

        return employee.fullName.includes(employeesFilter);
    };

    sortByName(fields, obj1, obj2) {
        let emp1 = fields.get(obj1.key);
        let emp2 = fields.get(obj2.key);
        return !emp1.fullName ? -1 : !emp2.fullName ? 1 :
            emp1.fullName.localeCompare(emp2.fullName);
    }

    render() {
        const {fields, showMobileAppModal, showEmployeeDialog, isDesktop, isLimited, showGoPremiumModal} = this.props;


        return (
            <Card>
                <CardHeader title="עובדים"/>

                <CardContent className={styles["card-content"]}>

                    <div className={styles["controls-line"]}>
                        <Tooltip title="הוספת עובד" placement="top">
                            <Button className={styles["action-button"]} variant="contained" color="primary"
                                    disabled={isLimited}
                                    onClick={this.onCreate}><AddIcon/></Button>
                        </Tooltip>
                        <Tooltip title="לינק לאפליקציית העובד" placement="top">
                            <Button className={styles["action-button"]} variant="contained" color="primary"
                                    onClick={() => showMobileAppModal()}><Icon>mobile_screen_share</Icon></Button>
                        </Tooltip>
                        <SearchBar onChange={(filter) =>   {
                            this.setState({employeesFilter: filter});
                        }}/>
                    </div>
                    <Divider className={styles["divider"]}/>

                    <GoPremiumNotification isVisible={isLimited} text="במסלול החינמי מותר עד 5 עובדים -" />

                    {fields && fields.length > 0 && isDesktop &&
                    <Grid className={styles["header"]} container spacing={24}>
                        <Grid item sm={3}>שם</Grid>
                        <Grid item sm={2} className={styles["header-item"]}>ת.ז.</Grid>
                        <Grid item sm={1} className={styles["header-item"]}>שכר לשעה</Grid>
                        <Grid item sm={2} className={styles["header-item"]}>נסיעות</Grid>
                    </Grid>
                    }
                    {fields && fields.map((employeeIndex, index) =>
                        (<Fade key={index} isVisible>
                            <Field component={EmployeeContainer}
                                   name={employeeIndex}
                                   index={index}
                                   onDelete={() => this.onDelete(fields, index)}
                                   onUpdate={(employee) => this.onUpdate(employee)}
                                   validate={this.validateEmployee}
                                   showEmployeeDialog={showEmployeeDialog}
                                   isLimited={isLimited}
                            />
                        </Fade>)
                    )
                        .filter((obj, index) => this.filterEmployees(obj, index, fields, this.state.employeesFilter))
                        .sort((obj1, obj2) => this.sortByName(fields, obj1, obj2))
                    }
                    {(!fields || (fields.length === 0)) &&
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
    showGoPremiumModal: PropTypes.func.isRequired,
    isDesktop: PropTypes.bool,
    isLimited: PropTypes.bool,
};

export default CSSModules(EmployeesList, styles);

