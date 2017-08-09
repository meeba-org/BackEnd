/**
 * Created by Chen on 16/07/2017.
 */

import React from 'react';
// import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Employees.scss";
import {Card} from "material-ui";
import {CardContent, CardHeader} from "../../node_modules/material-ui/Card/index";
import {Field} from 'redux-form';

const renderField = ({ input, inputValue, label, type, className, meta: { touched, error } }) =>
    <div>
        <label>
            {label}
        </label>
        <div>
            <input {...input} type={type} placeholder={label} value={inputValue} className={className} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>;

class Employees extends React.Component {
    render()
    {
        const {employees, fields} = this.props;
        console.log('fields: ' + fields.length + ', employees: ' + employees.length);
        return (
            <Card id="employees">
                <CardHeader title="עובדים"/>

                <CardContent className="card-content">

                    {fields && fields.map((employee, index) =>
                        <div key={index}>
                            <Field name="employeeFirstName" type="text" component={renderField} className="cell" inputValue={employee.first_name} />
                            <Field name="employeeUid" type="text" component={renderField} className="cell" inputValue={employee.uid} />
                        </div>
                    )}

                </CardContent>
            </Card>
        );
    }
}



export default CSSModules(Employees, styles);

