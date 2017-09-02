/**
 * Created by Chen on 16/07/2017.
 */

import React from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/Employees.scss";
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import PropTypes from 'prop-types';
import Employee from "./Employee";
import {Button, Card, Divider} from "material-ui";
import {Field} from "redux-form";
import AddIcon from 'material-ui-icons/Add';

class EmployeesList extends React.Component {

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
            role: "employee",
        };
        fields.push(newEmployee);
        this.props.onCreate(newEmployee);
    }

    onUpdate(employee) {
        this.props.onUpdate(employee);
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
                        <Button className="add-button" dense raised color="primary" onClick={() => this.onCreate(fields)}><AddIcon /></Button>
                        <Divider className="divider" />

                        {fields && fields.map((employeeIndex, index) =>
                            <Field component={Employee} name={employeeIndex} key={index} onDelete={()=> this.onDelete(fields, index)} onUpdate={(employee) => this.onUpdate(employee)}/>
                        )}
                    </div>

                </CardContent>
            </Card>
        );
    }
}

EmployeesList.propTypes = {
    fields: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CSSModules(EmployeesList, styles);

