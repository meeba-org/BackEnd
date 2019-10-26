import PropTypes from "prop-types";
import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as selectors from "../../selectors";
import Employee from "./Employee";
import EmployeeMobile from "./EmployeeMobile";

class EmployeeContainer extends Component {

    constructor(props) {
        super(props);
        let employee = props.employee || {};
        this.state = {
            employee: {...employee }
        };
    }

    onUpdate = (e, name) => {
        let {employee} = this.props;

        let newEmployee = {
            ...employee,
            [name]: e.target.value,
        };

        this.updateUser(newEmployee);
    };

    updateUser = (employee) => {
        this.setState({employee});
        this.props.onUpdate(employee);
    };

    onBlur = () => {
        let {onUpdate} = this.props;
        const {employee} = this.state;

        onUpdate(employee);
    };

    showEmployeeDialog = employee => this.props.showEmployeeDialog(employee, this.updateUser);

    render() {
        const {isDesktop, onDelete, order, isLimited, validate} = this.props;
        const {employee} = this.state;
        let error = validate(employee);

        return isDesktop ?
            <Employee
                onUpdate={this.onUpdate}
                onDelete={onDelete}
                onBlur={this.onBlur}
                employee={employee}
                showEmployeeDialog={this.showEmployeeDialog}
                isLimited={isLimited}
                error={error}
            /> :
            <EmployeeMobile
                onUpdate={this.onUpdate}
                onDelete={onDelete}
                onBlur={this.onBlur}
                employee={employee}
                showEmployeeDialog={this.showEmployeeDialog}
                order={order}
                isLimited={isLimited}
                error={error}
            />;
    }
}

EmployeeContainer.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isDesktop: selectors.isDesktop(state)
    };
};


export default connect(mapStateToProps)(EmployeeContainer);
