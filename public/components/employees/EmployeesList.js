/**
 * Created by Chen on 16/07/2017.
 */

import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {MAX_FREE_EMPLOYEES_ALLOWED} from "../../../constants";
import {isIsraeliIdValid} from "../../helpers/utils";
import "./styles/EmployeesList.scss";
import Fade from "../Fade";
import GoPremiumNotification from "../go-premium/GoPremiumNotification";
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import NoData from "../NoData";
import EmployeeContainer from "./EmployeeContainer";

const EmployeesList = ({employees, showEditEmployeeModal, isDesktop, isEditAllowed, isAddAllowed, onCreate, onDelete, onUpdate, showMobileAppModal}) => {
    
    // eslint-disable-next-line no-unused-vars
    const [employeesFilter, setEmployeesFilter] = useState("");

    const NOT_ALLOW_TO_ADD_MESSAGE = `במסלול החינמי מספר העובדים המקסימלי הוא ${MAX_FREE_EMPLOYEES_ALLOWED}`;

    const validateEmployee = value => {
        if (!value || !value.uid)
            return undefined;

        if (!isIsraeliIdValid(value.uid))
            return "ת.ז. לא תקינה";
        return undefined;
    };

    const filterEmployees = (employee, employeesFilter) => {
        if (!employeesFilter)
            return true;

        if (!employee || !employee.fullName)
            return false;

        return employee.fullName.includes(employeesFilter);
    };

    const sortByName = (emp1, emp2) => {
        return !emp1.fullName ? -1 : !emp2.fullName ? 1 :
            emp1.fullName.localeCompare(emp2.fullName);
    };

    const onShare = () => {
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


    const hasEmployees = (employees) => {
        return employees && employees.length > 0;
    };

    const processEmployees = (employees) => {
        let sort = employees
            .filter((employee) => filterEmployees(employee, employeesFilter))
            .sort((emp1, emp2) => sortByName(emp1, emp2));
        return sort;
    };

    let processedEmployees = processEmployees(employees);
    
    return (
        <MbCard title="עובדים">
            <MbActionsControls>
                <MbActionButton
                    disabled={!isAddAllowed}
                    onClick={() => onCreate({})}
                    iconComponent={AddIcon}
                    tooltip={isAddAllowed ? "הוספת עובד" : NOT_ALLOW_TO_ADD_MESSAGE}
                />
                <MbActionButton
                    onClick={onShare}
                    iconComponent={ShareIcon}
                    tooltip={"לינק לאפליקציית העובד"}
                />
            </MbActionsControls>

            <GoPremiumNotification isVisible={!isAddAllowed} text={NOT_ALLOW_TO_ADD_MESSAGE} />

            {hasEmployees(processedEmployees) && isDesktop &&
            <Grid styleName="header" container spacing={2}>
                <Grid item sm={3}>שם</Grid>
                <Grid item sm={2} styleName="header-item">ת.ז.</Grid>
                <Grid item sm={1} styleName="header-item">שכר לשעה</Grid>
                <Grid item sm={2} styleName="header-item">נסיעות</Grid>
            </Grid>
            }
            {hasEmployees(processedEmployees) && processedEmployees.map((employee, index) =>
                (<Fade key={employee._id} isVisible>
                    <EmployeeContainer
                        employee={employee}
                        order={index}
                        onDelete={() => onDelete(employee)}
                        onUpdate={onUpdate}
                        validate={validateEmployee}
                        showEditEmployeeModal={showEditEmployeeModal}
                        isLimited={!isEditAllowed}
                    />
                </Fade>)
            )
            }
            {!hasEmployees(processedEmployees) &&
            <NoData text="אין עובדים - בוא ננסה להוסיף!"/>
            }
        </MbCard>
    );
};

EmployeesList.propTypes = {
    employees: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    showMobileAppModal: PropTypes.func.isRequired,
    showEditEmployeeModal: PropTypes.func.isRequired,
    isDesktop: PropTypes.bool,
    isEditAllowed: PropTypes.bool,
    isAddAllowed: PropTypes.bool,
};

export default EmployeesList;

