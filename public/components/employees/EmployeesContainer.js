import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {MAX_FREE_EMPLOYEES_ALLOWED} from "../../../constants";
import {createUser, fetchUsers, showEditEmployeeModal, showGoPremiumModal, updateUser} from "../../actions";
import {showDeleteUserModal, showMobileAppModal} from "../../actions/usersActions";
import * as selectors from "../../selectors";
import EmployeesList from "./EmployeesList";

const EmployeesContainer = ({employees, deleteUser, updateUser, createUser, showMobileAppModal, showEditEmployeeModal, isDesktop, isEditAllowed, isAddAllowed, showGoPremiumModal, fetchEmployees}) => {
    useEffect(() => {
        fetchEmployees();
    }, []);
    
    return (
        <EmployeesList
            employees={employees}
            onDelete={deleteUser}
            onUpdate={updateUser}
            onCreate={createUser}
            showMobileAppModal={showMobileAppModal}
            showEditEmployeeModal={showEditEmployeeModal}
            showGoPremiumModal={showGoPremiumModal}
            isDesktop={isDesktop}
            isAddAllowed={isAddAllowed}
            isEditAllowed={isEditAllowed}
        />
    );
};

EmployeesContainer.propTypes = {
    employees: PropTypes.array,
    fetchEmployees: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    showMobileAppModal: PropTypes.func.isRequired,
    showEditEmployeeModal: PropTypes.func.isRequired,
    showGoPremiumModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    employees: state.users,
    isDesktop: selectors.isDesktop(state),
    isAddAllowed: selectors.hasPremiumFeature(state) || (state.users && state.users.length < MAX_FREE_EMPLOYEES_ALLOWED),
    isEditAllowed: selectors.hasPremiumFeature(state) || (state.users && state.users.length <= MAX_FREE_EMPLOYEES_ALLOWED),
});

const mapDispatchToProps = {
    fetchEmployees: fetchUsers,
    createUser,
    updateUser,
    deleteUser: showDeleteUserModal,
    showMobileAppModal,
    showEditEmployeeModal,
    showGoPremiumModal
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer);


