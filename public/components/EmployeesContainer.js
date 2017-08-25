import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Employees from "./Employees";
import {createEmployee, deleteEmployee, fetchEmployees, updateEmployee} from "../actions/actions";
import {FieldArray, reduxForm} from "redux-form";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        const {deleteEmployee} = this.props;
        return (
            <form>
                {this.props.employees && this.props.employees.length > 0 &&
                    <FieldArray name="employees" component={Employees} onDelete={deleteEmployee}  onUpdate={updateEmployee} onCreate={createEmployee}/>
                }
            </form>
        );
    }
}

EmployeesContainer.propTypes = {
    employees: PropTypes.array,
    fetchEmployees: PropTypes.func.isRequired,
    createEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        employees: state.data.employees, // TODO need both???
        initialValues: {
            employees: state.data.employees
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmployees: () => {dispatch(fetchEmployees());},
        createEmployee: (employees) => {dispatch(createEmployee(employees));},
        updateEmployee: (employees) => {dispatch(updateEmployee(employees));},
        deleteEmployee: (employees) => {dispatch(deleteEmployee(employees));},
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'employeesForm',
    enableReinitialize: true,
})(EmployeesContainer));
