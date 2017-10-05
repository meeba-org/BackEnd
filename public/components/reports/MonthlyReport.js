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

    // handleChange = name => event => {
    //     console.log(name);
    //     // this.setState({ [name]: event.target.value });
    // }

    render()
    {
        const {fields, onCreateShift, onUpdateShift, onDeleteShift} = this.props;
        return (
            <Card id="monthly-report">
                <CardHeader title="דוח חודשי"/>

                <CardContent className="card-content">

                    <div>
                        <Button className="add-button" dense raised color="primary" onClick={() => this.onCreate(fields)}><AddIcon /></Button>
                        {/*<Select*/}
                            {/*value="2017-09-01"*/}
                            {/*onChange={this.handleChange('monthChanged')}*/}
                            {/*input={<Input id="age-simple" />}*/}
                        {/*>*/}
                            {/*<MenuItem value="2017-09-01">ספטמבר 2017</MenuItem>*/}
                            {/*<MenuItem value="2017-10-01">אוקטובר 2017</MenuItem>*/}
                            {/*<MenuItem value="2017-11-01">נובמבר 2017</MenuItem>*/}
                        {/*</Select>*/}
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
