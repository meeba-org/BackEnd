import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Employees from "./Employees";
import {fetchEmployees} from "../actions/actions";
import {FieldArray, reduxForm} from "redux-form";

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
                    <FieldArray name="employees" employees={this.props.employees} component={Employees}/>
                }
                {/*{(!this.state.employees || this.state.employees.length === 0) &&*/}
                {/*<h2>No employees have been fetched</h2>*/}
                {/*}*/}
                {/*<Employees employees={this.props.employees || []} handleSubmit={this.submit} />*/}
            </div>
        );
    }
}

EmployeesContainer.propTypes = {
    fetchEmployees: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        employees: state.data.employees
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
    form: 'employees',
    enableReinitialize: true,
})(EmployeesContainer));
