/**
 * Created by Chen on 16/07/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Employees.scss";
import {Card} from "material-ui";
import {CardContent, CardHeader} from "../../node_modules/material-ui/Card/index";
import TextInput from "./TextInput";

class Employees extends Component {
    render() {
        let {employees} = this.props;
        return (
            <Card id="employees">
                <CardHeader title="עובדים"/>

                <CardContent className="card-content">
                    {employees && employees.map((employee) =>
                        <div key={employee._id}>
                            <TextInput className="cell" text={employee.first_name + ' ' + employee.last_name} handleChange={() => console.log("name")}/>
                            <TextInput className="cell" text={employee.uid} handleChange={() => console.log("uid")}/>
                        </div>
                    )}
                    {(!employees || employees.length === 0) &&
                    <h2>No employees have been fetched</h2>
                    }
                </CardContent>
            </Card>
        );
    }
}

Employees.propTypes = {
    employees: PropTypes.array.isRequired,
};

export default CSSModules(Employees, styles);

