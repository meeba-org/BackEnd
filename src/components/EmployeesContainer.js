import React from 'react';
import {connect} from 'react-redux';
import Employees from "./Employees";
import axios from "axios";

class EmployeesContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/users')
            .then(res => this.setState({ employees: res.data.users }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Employees employees={this.state.employees || []}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {employees: state.employees};
}

function mapDispatchToProps() {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer);
