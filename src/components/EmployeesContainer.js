import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Employees from "./Employees";
import {fetchEmployees} from "../actions/actions";
import {FieldArray, reduxForm} from "redux-form";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        return (
            <form>
                {this.props.employees && this.props.employees.length > 0 &&
                    <FieldArray name="employees" component={Employees}/>
                }
            </form>
        );
    }
}

EmployeesContainer.propTypes = {
    fetchEmployees: PropTypes.func.isRequired,
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
        fetchEmployees: () => {dispatch(fetchEmployees());}
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'employeesForm',
    enableReinitialize: true,
})(EmployeesContainer));
