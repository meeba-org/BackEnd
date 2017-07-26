/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Employees extends Component {
    static propTypes = {
        employees: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.localState = {
            employees: this.props.employees
        }
    }

    render() {
        let {employees} = this.localState;
        return (
            <div>
                <div><h1>Employees Window</h1></div>

                {employees.map((employee, index) =>
                    <div>
                        <div>id: {employee.uid}</div>
                        <div>name: {employee.name}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default Employees;

