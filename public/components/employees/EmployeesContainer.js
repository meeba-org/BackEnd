import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import reduxForm from "redux-form/es/reduxForm";
import {MAX_FREE_EMPLOYEES_ALLOWED} from "../../../constants";
import {createUser, fetchUsers, showEditEmployeeModal, showGoPremiumModal, updateUser} from "../../actions";
import {showDeleteUserModal, showMobileAppModal} from "../../actions/usersActions";
import * as selectors from "../../selectors";
import EmployeesList from "./EmployeesList";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        const {employees, deleteUser, updateUser, createUser, showMobileAppModal, showEmployeeDialog, isDesktop, isEditAllowed, isAddAllowed, showGoPremiumModal} = this.props;
        return (
            <EmployeesList
                employees={employees}
                onDelete={deleteUser}
                onUpdate={updateUser}
                onCreate={createUser}
                showMobileAppModal={showMobileAppModal}
                showEmployeeDialog={showEmployeeDialog}
                showGoPremiumModal={showGoPremiumModal}
                isDesktop={isDesktop}
                isAddAllowed={isAddAllowed}
                isEditAllowed={isEditAllowed}
            />
        );
    }
}

EmployeesContainer.propTypes = {
    employees: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    showMobileAppModal: PropTypes.func.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
    showGoPremiumModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        employees: state.users,
        isDesktop: selectors.isDesktop(state),
        isAddAllowed: selectors.hasPremiumFeature(state) || (state.users && state.users.length < MAX_FREE_EMPLOYEES_ALLOWED),
        isEditAllowed: selectors.hasPremiumFeature(state) || (state.users && state.users.length <= MAX_FREE_EMPLOYEES_ALLOWED),
    };
}

const mapDispatchToProps = {
        fetchEmployees: fetchUsers,
        createUser,
        updateUser,
        deleteUser: showDeleteUserModal,
        showMobileAppModal,
        showEmployeeDialog: showEditEmployeeModal,
        showGoPremiumModal
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'employeesForm',
    enableReinitialize: true,
})(EmployeesContainer));


