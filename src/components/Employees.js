/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Employees extends Component {
    render() {
        let {employees} = this.props;
        return (
            <div>
                <div><h1>Employees Window</h1></div>

                {employees && employees.map((employee) =>
                    <div key={employee._id}>
                        <span>תז: {employee.uid}</span>
                        <span>שם: {employee.first_name + ' ' + employee.last_name}</span>
                    </div>
                )}
                {(!employees || employees.length === 0) &&
                    <h2>No employees have been fetched</h2>
                }
            </div>
        );
    }
}

Employees.propTypes = {
    employees: PropTypes.array.isRequired,
};

export default Employees;

