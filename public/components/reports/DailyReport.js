import * as React from "react";
import {Button, Card, Divider, TextField} from "material-ui";
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import {FieldArray} from "redux-form";
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/DailyReport.scss';
import ShiftsList from "./ShiftsList";
import {calculateCurrentDay, calculateCurrentTime, ReportModes} from "../../helpers/utils";
import AddShiftsDialog from "../AddShiftsDialog";
import AutoComplete from "../AutoComplete";

class DailyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: calculateCurrentDay(),
            currentTime: calculateCurrentTime(),
            open: false,
        };
    }

    componentDidMount() {
        this.props.onDayChange(this.state.currentDay);
    }

    handleChange(event) {
        let currentDay = event.target.value;

        this.setState({currentDay});
        this.props.onDayChange(currentDay);
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleRequestClose() {
        this.setState({open: false});
    }

    render() {
        const {onCreateShift, onUpdateShift, onDeleteShift, employees, mode} = this.props;
        let {currentTime, currentDay} = this.state;

        return (
            <Card id="daily-report">
                {(mode === ReportModes.Daily) &&
                <div>
                    <CardHeader title="דוח יומי"/>

                    <CardContent className="card-content">

                        <div>
                            <Button className="add-button" dense raised color="primary"
                                    onClick={() => this.handleClickOpen()}><AddIcon/></Button>
                            <AddShiftsDialog
                                open={this.state.open}
                                onCreate={onCreateShift}
                                onCancel={() => this.handleRequestClose()}
                                employees={employees}
                            />

                            <TextField className="daily-date" type="date" defaultValue={currentDay} placeholder="תאריך"
                                       onChange={(e) => this.handleChange(e)}/>

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
                </div>
                }
                {(mode === ReportModes.Live) &&
                    <div>
                        <CardHeader title="מצב משמרת"/>

                        <CardContent className="card-content" >
                            <div className="date">{currentDay}</div>
                            <div className="date">{currentTime}</div>

                            <AutoComplete placeholder="הכנס עובד למשמרת" suggestions={employees.map(employee => employee.firstName)}/>

                        </CardContent>
                    </div>
                }
            </Card>
        );
    }
}

DailyReport.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
    onDayChange: PropTypes.func.isRequired,
};

export default CSSModules(DailyReport, styles);
