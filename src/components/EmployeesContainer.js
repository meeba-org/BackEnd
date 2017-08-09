import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Employees from "./Employees";
import {fetchEmployees} from "../actions/actions";
import {Field, FieldArray, reduxForm} from "redux-form";

const renderField = ({ input, inputValue, label, type, className, meta: { touched, error } }) =>
    <div>
        <label>
            {label}
        </label>
        <div>
            <input {...input} type={type} placeholder={label} value={inputValue} className={className} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>;

const renderMembers = ({ employees, meta: { error, submitFailed } }) =>
    <div>
        {employees.map((employee, index) =>
            <div key={index}>
                <Field name="employees.first_name" type="text" component={renderField} className="cell" inputValue={employee.first_name} />
                <Field name="employees.uid" type="text" component={renderField} className="cell" inputValue={employee.uid} />
            </div>
        )}
    </div>;

class EmployeesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        return (
            <div>
                {this.props.employees && this.props.employees.length > 0 &&
                    <FieldArray name="employees" employees={this.props.employees} component={renderMembers}/>
                }
            </div>
        );
    }
}

EmployeesContainer.propTypes = {
    fetchEmployees: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        employees: state.data.employees,
        initialValues: {
            employees: state.data.employees
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmployees: () => {dispatch(fetchEmployees());}
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'employeesForm',
    enableReinitialize: true,
}, mapStateToProps)(EmployeesContainer));
