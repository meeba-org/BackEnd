import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Employees from "./Employees";
import {fetchEmployees} from "../actions/actions";

class EmployeesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchEmployees();
    }

    submit(values) {
        console.log(values);
    }

    render() {
        return (
            <div>
                <Employees employees={this.props.employees || []} handleSubmit={this.submit} />
            </div>
        );
    }
}

EmployeesContainer.propTypes = {
    fetchEmployees: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        employees: state.data.data.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmployees: () => {dispatch(fetchEmployees());}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer);
