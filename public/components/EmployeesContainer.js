import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Employees from "./Employees";
import {createEmployee, deleteEmployee, fetchEmployees, updateEmployee} from "../actions/actions";
import {FieldArray, formValueSelector, reduxForm} from "redux-form";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        const {handleSubmit, deleteEmployee, updateEmployee, createEmployee} = this.props;
        return (
            <form onSubmit={handleSubmit(() => {})}>
                {this.props.employees && this.props.employees.length > 0 &&
                    <FieldArray name="employees" component={Employees} onDelete={deleteEmployee}  onUpdate={updateEmployee} onCreate={createEmployee}/>
                }
            </form>
        );
    }
}

EmployeesContainer.propTypes = {
    employees: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    createEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
};

const selector = formValueSelector('employeesForm');

function mapStateToProps(state) {
    return {
        employees: state.data.employees, // TODO dont know how to init that without hose two... :-(
        initialValues: {
            employees: state.data.employees
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmployees: () => {dispatch(fetchEmployees());},
        createEmployee: (employee) => {dispatch(createEmployee(employee));},
        updateEmployee: (employee) => {dispatch(updateEmployee(employee));},
        deleteEmployee: (employee) => {dispatch(deleteEmployee(employee));},
    };
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'employeesForm',
    enableReinitialize: true,
})(EmployeesContainer));


