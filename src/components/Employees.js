/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Employees.scss";

class Employees extends Component {
    render() {
        let {employees} = this.props;
        return (
            <div id="employees" className="font-style">
                <div><h2 id="header">עובדים</h2></div>

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

export default CSSModules(Employees, styles);

