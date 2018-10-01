import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmployeesList from "./EmployeesList";
import {createUser, fetchUsers, updateUser} from "../../actions";
import FieldArray from "redux-form/es/FieldArray";
import reduxForm from "redux-form/es/reduxForm";
import {showDeleteUserModal, showMobileAppModal} from "../../actions/usersActions";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        const {handleSubmit, deleteUser, updateUser, createUser, showMobileAppModal} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                <FieldArray
                    name="employees"
                    component={EmployeesList}
                    onDelete={deleteUser}
                    onUpdate={updateUser}
                    onCreate={createUser}
                    showMobileAppModal={showMobileAppModal}
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
};

function mapStateToProps(state) {
    return {
        initialValues: {
            employees: state.users
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmployees: () => {
            dispatch(fetchUsers(true));
        },
        createUser: (employee) => {
            dispatch(createUser(employee));
        },
        updateUser: (employee) => {
            dispatch(updateUser(employee));
        },
        deleteUser: (employee) => {
            dispatch(showDeleteUserModal(employee));
        },
        showMobileAppModal: () => {
            dispatch(showMobileAppModal());
        }
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'employeesForm',
    enableReinitialize: true,
})(EmployeesContainer));


