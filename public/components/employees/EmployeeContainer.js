import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import connect from "react-redux/es/connect/connect";
import * as selectors from "../../selectors";
import Employee from "./Employee";
import EmployeeMobile from "./EmployeeMobile";

const EmployeeContainer = ({isDesktop, onDelete, onUpdate, order, isLimited, validate, showEditEmployeeModal, employee}) => {
    const [lsEmployee, setLsEmployee] = useState(employee);

    useEffect(() => {
        setLsEmployee(employee);
    }, [employee]);
    
    const handleUpdate = (e, name) => {
        let newEmployee = {
            ...employee,
            [name]: e.target.value,
        };

        updateUser(newEmployee);
    };

    const updateUser = (employee) => {
        setLsEmployee(employee);
        onUpdate(employee);
    };

    const onBlur = () => {
        let {onUpdate} = this.props;
        const {employee} = this.state;

        onUpdate(employee);
    };

    let error = validate(employee);

    return isDesktop ?
        <Employee
            onUpdate={handleUpdate}
            onDelete={onDelete}
            onBlur={onBlur}
            employee={lsEmployee}
            showEditEmployeeModal={() => showEditEmployeeModal(employee, updateUser)}
            isLimited={isLimited}
            error={error}
        /> :
        <EmployeeMobile
            onUpdate={handleUpdate}
            onDelete={onDelete}
            onBlur={onBlur}
            employee={lsEmployee}
            showEditEmployeeModal={() => showEditEmployeeModal(employee, updateUser)}
            order={order}
            isLimited={isLimited}
            error={error}
        />;
};

EmployeeContainer.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showEditEmployeeModal: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isDesktop: selectors.isDesktop(state)
    };
};


export default connect(mapStateToProps)(EmployeeContainer);
