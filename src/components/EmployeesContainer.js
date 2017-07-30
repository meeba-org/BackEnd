import React from 'react';
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

function mapStateToProps(state) {
    return {
        employees: state.data.data.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmployees: () => {dispatch(fetchEmployees())}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer);
