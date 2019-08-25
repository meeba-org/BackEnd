import PropTypes from "prop-types";
import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as selectors from "../../selectors";
import Employee from "./Employee";
import EmployeeMobile from "./EmployeeMobile";

class EmployeeContainer extends Component {
    onUpdate = (e, name) => {
        let {input} = this.props;

        let employee = {
            ...input.value,
            [name]: e.target.value,
        };

        input.onChange(employee);
    };

    onBlur = () => {
        let {input, onUpdate} = this.props;

        onUpdate(input.value);
    };

    render() {
        const {isDesktop, onDelete, input, showEmployeeDialog, index, meta: {error}, isLimited} = this.props;
        return isDesktop ?
            <Employee
                onUpdate={this.onUpdate}
                onDelete={onDelete}
                onBlur={this.onBlur}
                input={input}
                error={error}
                showEmployeeDialog={showEmployeeDialog}
                isLimited={isLimited}
            /> :
            <EmployeeMobile
                onUpdate={this.onUpdate}
                onDelete={onDelete}
                onBlur={this.onBlur}
                input={input}
                error={error}
                showEmployeeDialog={showEmployeeDialog}
                index={index}
                isLimited={isLimited}
            />;
    }
}

EmployeeContainer.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showEmployeeDialog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isDesktop: selectors.isDesktop(state)
    };
};


export default connect(mapStateToProps)(EmployeeContainer);
