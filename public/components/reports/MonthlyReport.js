import * as React from "react";
import CSSModules from "react-css-modules";
import styles from "../../styles/MonthlyReport.scss";
import {Button, Card, Divider} from "material-ui";
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import PropTypes from 'prop-types';
import EmployeeReport from "./EmployeeReport";
import {Field} from "redux-form";

class MonthlyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {collapsed: null};
    }

    isCollapsed(name) {
        return this.state.collapsed === name;
    }

    onToggle(name) {
        this.setState({collapsed: name});
    }
    render()
    {
        const {fields} = this.props;
        return (
            <Card id="monthly-report">
                <CardHeader title="דוח חודשי"/>

                <CardContent className="card-content">

                    <div>
                        <Button className="add-button" dense raised color="primary" onClick={() => this.onCreate(fields)}><AddIcon /></Button>
                        <Divider className="divider" />

                        {fields && fields.map((employeeIndex, index) =>
                            <Field component={EmployeeReport}
                                   name={employeeIndex}
                                   isCollapsed={(name) => this.isCollapsed(name)}
                                   key={index}
                                   onDelete={()=> this.onDelete(fields, index)}
                                   onToggle={(name) => this.onToggle(name)}
                            />
                        )}
                    </div>

                </CardContent>
            </Card>
        );
    }
}

MonthlyReport.propTypes = {
    fields: PropTypes.object,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default CSSModules(MonthlyReport, styles);
