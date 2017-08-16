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
        this.updateEmployee = this.updateEmployee.bind(this);
        this.updateStore = this.updateStore.bind(this);
    }

    updateEmployee(val, id){
        let index = parseInt(id);
        let {Employees} = this.state;
        let updatedEmployees = [
            ...Employees.filter((elem, idx) => idx < index),
            Object.assign({}, Employees[index], {first_name: val.first_name, uid: val.uid}),
            ...Employees.filter((elem, idx) => idx > index),
        ];
        this.setState({Employees: updatedEmployees });
        this.updateStore(updatedEmployees);
    }

    updateStore(localState){
        this.props.input.onChange(localState);
    }

    render()
    {
        const {fields} = this.props;
        return (
            <Card id="employees">
                <CardHeader title="עובדים"/>

                <CardContent className="card-content">

                    <div>
                    {fields && fields.map((employeeIndex, index) =>
                        <div>
                            <Employee {...fields.get(index)} name={employeeIndex} key={fields.get(index)._id} />
                            <button  onClick={() => fields.remove(fields.get(index)._id)}>מחק</button>
                        </div>
                        )}
                        <button  onClick={() => fields.push({})}>הוסף</button>
                    </div>

                </CardContent>
            </Card>
        );
    }
}

Employees.propTypes = {
    fields: PropTypes.object.isRequired,
};

export default CSSModules(Employees, styles);

