/**
 * Created by Chen on 16/07/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/Employees.scss";
import {Card} from "material-ui";
import {CardContent, CardHeader} from "../../node_modules/material-ui/Card/index";
import TextInput from "./TextInput";
import { reduxForm } from 'redux-form';

let Employees = (props) => {
    const {employees, handleSubmit} = props;

    return (
        <Card id="employees">
            <CardHeader title="עובדים"/>

            <CardContent className="card-content">
                <form onSubmit={handleSubmit}>
                    {employees && employees.map((employee) =>
                        <div key={employee._id}>
                            <TextInput name={"name" + employee._id} className="cell" text={employee.first_name + ' ' + employee.last_name} />
                            <TextInput name={"uid" + employee._id} className="cell" text={employee.uid} />
                        </div>
                    )}
                    {(!employees || employees.length === 0) &&
                    <h2>No employees have been fetched</h2>
                    }
                </form>
            </CardContent>
        </Card>
    );
};

Employees.propTypes = {
    employees: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

// create new, "configured" function
const createReduxForm = reduxForm({ form: 'employees', enableReinitialize : true});

// evaluate it for ContactForm component
Employees = createReduxForm( Employees );

export default CSSModules(Employees, styles);

