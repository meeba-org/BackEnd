import * as React from "react";
import {Button, Card, Divider, TextField} from "material-ui";
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import {FieldArray} from "redux-form";
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/DailyReport.scss';
import ShiftsList from "./ShiftsList";
import {calculateCurrentDay} from "../../helpers/utils";

class DailyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: null,
            currentDay: calculateCurrentDay()
        };
    }

    componentDidMount() {
        this.props.onDayChange(this.state.currentDay);
    }

    isCollapsed(fields, index) {
        let employee = fields.get(index);
        return this.state.collapsed !== employee.uid;
    }

    onToggle(name) {
        let newCollapsedelement = this.state.collapsed === name ? null : name;
        this.setState({collapsed: newCollapsedelement});
    }

    handleChange(event)  {
        let currentDay = event.target.value;

        this.setState({currentDay});
        this.props.onDayChange(currentDay);
    }

    render() {
        const {onCreateShift, onUpdateShift, onDeleteShift} = this.props;
        let currentDay = this.state.currentDay;

        return (
            <Card id="daily-report">
                <CardHeader title="דוח יומי"/>

                <CardContent className="card-content">

                    <div>
                        <Button className="add-button" dense raised color="primary" onClick={() => this.onCreate(fields)}><AddIcon /></Button>

                        <TextField className="daily-date" type="date" defaultValue={currentDay} placeholder="תאריך"
                                   onChange={(e) => this.handleChange(e)} />

                        <Divider className="divider"/>

                        <FieldArray
                            name="shifts"
                            component={ShiftsList}
                            onDelete={onDeleteShift}
                            onUpdate={onUpdateShift}
                            onCreate={onCreateShift}
                            showNames={true}
                        />
                    </div>

                </CardContent>
            </Card>
        );
    }
}

DailyReport.propTypes = {
    shifts: PropTypes.array,
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
    onDayChange: PropTypes.func.isRequired,
};

export default CSSModules(DailyReport, styles);
