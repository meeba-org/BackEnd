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

    render() {
        return (
            <div>
                <Employees employees={this.props.employees || []}/>
            </div>
        );
    }
}

EmployeesContainer.propTypes = {
    fetchEmployees: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
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
