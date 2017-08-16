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

    onDelete(fields, index) {
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
                    {fields && fields.map((employeeIndex, index) =>
                        <Employee {...fields.get(index)} name={employeeIndex} key={index} onDelete={()=> this.onDelete(fields, index)} />
                        )}
                        {/*<button  onClick={() => fields.push({})}>הוסף</button>*/}
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

