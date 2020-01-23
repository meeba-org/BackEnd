/**
 * Created by Chen on 16/07/2017.
 */

import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import PropTypes from 'prop-types';
import React from 'react';
import {MAX_FREE_EMPLOYEES_ALLOWED} from "../../../constants";
import {isIsraeliIdValid} from "../../helpers/utils";
import "../../styles/EmployeesList.scss";
import Fade from "../Fade";
import GoPremiumNotification from "../go-premium/GoPremiumNotification";
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import NoData from "../NoData";
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
            // <Card styleName="employees-list">
            <MbCard title="עובדים">
                <MbActionsControls>
                    <MbActionButton
                        disabled={!isAddAllowed}
                        onClick={this.onCreate}
                        iconComponent={AddIcon}
                        tooltip={isAddAllowed ? "הוספת עובד" : this.NOT_ALLOW_TO_ADD_MESSAGE}
                    />
                    <MbActionButton
                        onClick={this.showMobileAppModal}
                        iconComponent={ShareIcon}
                        tooltip={"לינק לאפליקציית העובד"}
                    />
                </MbActionsControls>

                    <GoPremiumNotification isVisible={!isAddAllowed} text={this.NOT_ALLOW_TO_ADD_MESSAGE} />

                    {this.hasEmployees(processEmployees) && isDesktop &&
                    <Grid styleName="header" container spacing={24}>
                        <Grid item sm={3}>שם</Grid>
                        <Grid item sm={2} styleName="header-item">ת.ז.</Grid>
                        <Grid item sm={1} styleName="header-item">שכר לשעה</Grid>
                        <Grid item sm={2} styleName="header-item">נסיעות</Grid>
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
            </MbCard>
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

