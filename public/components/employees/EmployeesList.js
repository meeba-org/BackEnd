/**
 * Created by Chen on 16/07/2017.
 */

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import {MAX_FREE_EMPLOYEES_ALLOWED} from "../../../constants";
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

    NOT_ALLOW_TO_ADD_MESSAGE = `במסלול החינמי מספר העובדים המקסימלי הוא ${MAX_FREE_EMPLOYEES_ALLOWED}`;

    onCreate = () => {
        this.props.onCreate({});
    };

    onUpdate(employee) {
        this.props.onUpdate(employee);
    }

    onDelete(employeeToDelete) {
        this.props.onDelete(employeeToDelete);
    }

    validateEmployee = value => {
        if (!value || !value.uid)
            return undefined;

        if (!isIsraeliIdValid(value.uid))
            return "ת.ז. לא תקינה";
        return undefined;
    }

    filterEmployees = (employee, employeesFilter) => {
        if (!employeesFilter)
            return true;

        if (!employee || !employee.fullName)
            return false;

        return employee.fullName.includes(employeesFilter);
    };

    sortByName(emp1, emp2) {
        return !emp1.fullName ? -1 : !emp2.fullName ? 1 :
            emp1.fullName.localeCompare(emp2.fullName);
    }

    showMobileAppModal = () => {
        const {showMobileAppModal} = this.props;

        if (navigator.share) {
            navigator.share({
                title: 'התקנת שעון נוכחות',
                text: `
עובד יקר,
התחלנו להשתמש בשעון הנוכחות "מיבא".
אנא הורד את האפליקציה:
אנדרואיד - https://goo.gl/iGzWxX
או
אייפון - https://goo.gl/L6WKJc
                `
            });
        } else
            showMobileAppModal();
    };


    hasEmployees(employees) {
        return employees && employees.length > 0;
    }

    processEmployees(employees) {
        let sort = employees
            .filter((employee) => this.filterEmployees(employee, this.state.employeesFilter))
            .sort((emp1, emp2) => this.sortByName(emp1, emp2));
        return sort;
    }

    render() {
        const {employees, showEmployeeDialog, isDesktop, isEditAllowed, isAddAllowed} = this.props;
        let processEmployees = this.processEmployees(employees);

        return (
            <Card styleName="employees-list">
                <CardHeader title="עובדים"/>

                <CardContent className={styles["card-content"]}>

                    <div className={styles["controls-line"]}>
                        <Tooltip title={isAddAllowed ? "הוספת עובד" : this.NOT_ALLOW_TO_ADD_MESSAGE} placement="top">
                            <span>
                            <Button className={styles["action-button"]} variant="contained" color="primary"
                                    disabled={!isAddAllowed}
                                    onClick={this.onCreate}><AddIcon/></Button>
                            </span>
                        </Tooltip>
                        <Tooltip title="לינק לאפליקציית העובד" placement="top">
                            <Button className={styles["action-button"]} variant="contained" color="primary"
                                    onClick={this.showMobileAppModal}><ShareIcon/></Button>
                        </Tooltip>
                        <SearchBar onChange={(filter) =>   {
                            this.setState({employeesFilter: filter});
                        }}/>
                    </div>
                    <Divider className={styles["divider"]}/>

                    <GoPremiumNotification isVisible={!isAddAllowed} text={this.NOT_ALLOW_TO_ADD_MESSAGE} />

                    {this.hasEmployees(processEmployees) && isDesktop &&
                    <Grid className={styles["header"]} container spacing={24}>
                        <Grid item sm={3}>שם</Grid>
                        <Grid item sm={2} className={styles["header-item"]}>ת.ז.</Grid>
                        <Grid item sm={1} className={styles["header-item"]}>שכר לשעה</Grid>
                        <Grid item sm={2} className={styles["header-item"]}>נסיעות</Grid>
                    </Grid>
                    }
                    {this.hasEmployees(processEmployees) && processEmployees.map((employee, index) =>
                        (<Fade key={employee._id} isVisible>
                            <EmployeeContainer
                                employee={employee}
                                order={index}
                                onDelete={() => this.onDelete(employee)}
                                onUpdate={(employee) => this.onUpdate(employee)}
                                validate={this.validateEmployee}
                                showEmployeeDialog={showEmployeeDialog}
                                isLimited={!isEditAllowed}
                            />
                        </Fade>)
                    )
                    }
                    {!this.hasEmployees(processEmployees) &&
                    <NoData text="אין עובדים - בוא ננסה להוסיף!"/>
                    }


                </CardContent>
            </Card>
        );
    }
}

EmployeesList.propTypes = {
    employees: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    showMobileAppModal: PropTypes.func.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
    isDesktop: PropTypes.bool,
    isEditAllowed: PropTypes.bool,
    isAddAllowed: PropTypes.bool,
};

export default EmployeesList;

