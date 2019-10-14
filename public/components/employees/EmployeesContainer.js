import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MAX_FREE_EMPLOYEES_ALLOWED} from "../../../constants";
import EmployeesList from "./EmployeesList";
import {createUser, fetchUsers, showEditEmployeeModal, showGoPremiumModal, updateUser} from "../../actions";
import FieldArray from "redux-form/es/FieldArray";
import reduxForm from "redux-form/es/reduxForm";
import {showDeleteUserModal, showMobileAppModal} from "../../actions/usersActions";
import * as selectors from "../../selectors";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        const {handleSubmit, deleteUser, updateUser, createUser, showMobileAppModal, showEmployeeDialog, isDesktop, isEditAllowed, isAddAllowed, showGoPremiumModal} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <FieldArray
                    name="employees"
                    component={EmployeesList}
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
            </form>
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
        initialValues: {
            employees: state.users
        },
        isDesktop: selectors.isDesktop(state),
        isAddAllowed: selectors.hasPremiumFeature(state) || (state.users && state.users.length < MAX_FREE_EMPLOYEES_ALLOWED),
        isEditAllowed: selectors.hasPremiumFeature(state) || (state.users && state.users.length <= MAX_FREE_EMPLOYEES_ALLOWED),
    };
}

const mapDispatchToProps = {
        fetchEmployees: () => fetchUsers(true),
        createUser: (employee) => createUser(employee),
        updateUser: (employee) => updateUser(employee),
        deleteUser: (employee) => showDeleteUserModal(employee),
        showMobileAppModal: () => showMobileAppModal(),
        showEmployeeDialog: (employee, callBack) => showEditEmployeeModal(employee, callBack),
        showGoPremiumModal: () => showGoPremiumModal()
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'employeesForm',
    enableReinitialize: true,
})(EmployeesContainer));


