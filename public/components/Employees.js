/**
 * Created by Chen on 16/07/2017.
 */

import React from 'react';
import CSSModules from "react-css-modules";
import styles from "../styles/Employees.scss";
import {CardContent, CardHeader} from "../../node_modules/material-ui/Card/index";
import PropTypes from 'prop-types';
import Employee from "./Employee";
import {Card} from "material-ui";

class Employees extends React.Component {

    constructor(props) {
        super(props);
    }

    onCreate(fields) {
        let newEmployee = {};
        fields.push(newEmployee);
        this.props.onCreate(newEmployee);
    }

    onUpdate(fields, index) {
        let employeeToUpdate = fields.get(index);
        this.props.onUpdate(employeeToUpdate);
    }

    onDelete(fields, index) {
        let employeeToDelete = fields.get(index);
        this.props.onDelete(employeeToDelete);
        fields.remove(index);
    }

    render()
    {
        const {fields} = this.props;
        return (
            <Card id="employees">
                <CardHeader title="עובדים"/>

                <CardContent className="card-content">

                    <div>
                        <button  onClick={() => this.onCreate(fields)}>הוסף</button>

                        {fields && fields.map((employeeIndex, index) =>
                        <Employee {...fields.get(index)} name={employeeIndex} key={index} onDelete={()=> this.onDelete(fields, index)} onUpdate={() => this.onUpdate(fields, index)}/>
                        )}
                    </div>

                </CardContent>
            </Card>
        );
    }
}

Employees.propTypes = {
    fields: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CSSModules(Employees, styles);

