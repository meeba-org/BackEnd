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
        let newEmployee = {
            uid: 73,
            first_name: "test",
            last_name: "last",
            email: "chenop@gmail.com",
            password: "1234",
            role: "manager",
        };
        fields.push(newEmployee);
        this.props.onCreate(newEmployee);
    }

    onUpdate(fields, index, name, value) {

        this.props.onUpdate(fields, index, name, value);
    }

    onDelete(fields, index) {
        let employeeToDelete = fields.get(index);
        fields.remove(index);
        this.props.onDelete(employeeToDelete);
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
                        <Employee {...fields.get(index)} name={employeeIndex} key={index} onDelete={()=> this.onDelete(fields, index)} onUpdate={(name, value) => this.onUpdate(fields, index, name, value)}/>
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

