import * as React from "react";
import CSSModules from "react-css-modules";
import styles from "../../styles/MonthlyReport.scss";
import {Button, Card, Divider} from "material-ui";
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import PropTypes from 'prop-types';
import EmployeeReport from "./MonthlyReportLine";
import {Field} from "redux-form";

class MonthlyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {collapsed: null};
    }

    isCollapsed(fields, index) {
        let employee = fields.get(index);
        return this.state.collapsed !== employee.uid;
    }

    onToggle(name) {
        let newCollapsedelement = this.state.collapsed === name ? null : name;
        this.setState({collapsed: newCollapsedelement});
    }
    render()
    {
        const {fields, onCreateShift, onUpdateShift, onDeleteShift} = this.props;
        return (
            <Card id="monthly-report">
                <CardHeader title="דוח חודשי"/>

                <CardContent className="card-content">

                    <div>
                        <Button className="add-button" dense raised color="primary" onClick={() => this.onCreate(fields)}><AddIcon /></Button>
                        <Divider className="divider" />

                        {fields && fields.map((employee, index) =>
                            <Field component={EmployeeReport}
                                   name={employee}
                                   isCollapsed={this.isCollapsed(fields, index)}
                                   key={index}
                                   onToggle={(name) => this.onToggle(name)}
                                   onDeleteShift={onDeleteShift}
                                   onUpdateShift={onUpdateShift}
                                   onCreateShift={onCreateShift}
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
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
};
export default CSSModules(MonthlyReport, styles);
