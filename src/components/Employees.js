/**
 * Created by Chen on 16/07/2017.
 */

import React from 'react';
import CSSModules from "react-css-modules";
import styles from "../styles/Employees.scss";
import {Card} from "material-ui";
import {CardContent, CardHeader} from "../../node_modules/material-ui/Card/index";
import {Field} from 'redux-form';
import PropTypes from 'prop-types';

const renderField = ({ input, label, type, className, meta: { touched, error } }) =>
    <div>
        <label>
            {label}
        </label>
        <div>
            <input {...input} type={type} placeholder={label} className={className} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>;

renderField.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

class Employees extends React.Component {
    render()
    {
        const {fields} = this.props;
        return (
            <Card id="employees">
                <CardHeader title="עובדים"/>

                <CardContent className="card-content">

                    {fields && fields.map((employee, index) =>
                        <div key={index}>
                            <Field name={`${employee}.first_name`} type="text" component={renderField} className="cell" />
                            <Field name={`${employee}.uid`} type="text" component={renderField} className="cell" />
                        </div>
                    )}

                </CardContent>
            </Card>
        );
    }
}

Employees.propTypes = {
    fields: PropTypes.object.isRequired,
}

export default CSSModules(Employees, styles);

