import React from "react";
import {Button, Card, Divider, TextField, Tooltip} from "material-ui";
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';
import {FieldArray} from "redux-form";
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/DailyReport.scss';
import ShiftsList from "./ShiftsList";
import AddShiftsDialog from "../AddShiftsDialog";
import {
    calculateCurrentDay, calculateCurrentTime, createShiftForClockIn, DATE_FORMAT,
    ReportModes
} from "../../helpers/utils";
import AutoComplete from "../AutoComplete";
import {withTheme} from 'material-ui/styles';
import moment from "moment/moment";

class DailyReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: calculateCurrentDay(),
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

    onClockIn = (employee) => {
        let shift = createShiftForClockIn(employee);
        this.props.onCreateShift(shift);
    };

    onUpdateShift = (shift, input) => {
        let value = moment(this.state.currentDay, DATE_FORMAT);
        this.props.onUpdateShift(shift, value.format('MM'), value.format('YYYY'), input);
    };

    render() {
        const {onCreateShift, onDeleteShift, employees, mode} = this.props;
        let {currentDay} = this.state;
        let {primary, secondary} = this.props.theme.palette.text;

        return (
            <Card>
                {(mode === ReportModes.Report) &&
                <div>
                    <CardHeader title="דוח יומי"/>

                    <CardContent className="card-content">

                        <div id="daily-report">
                            <div className="controls-line">
                                <TextField className="daily-date" type="date" defaultValue={currentDay} placeholder="תאריך"
                                           onChange={(e) => this.handleChange(e)}/>

                                <Tooltip title="הוספת משמרת" placement="top">
                                    <Button className="action-button" dense raised color="primary"
                                        onClick={() => this.handleClickOpen()}><AddIcon/></Button>
                                </Tooltip>
                                <AddShiftsDialog
                                    open={this.state.open}
                                    onCreate={onCreateShift}
                                    onCancel={() => this.handleRequestClose()}
                                    employees={employees}
                                />
                            </div>

                            <Divider className="divider"/>

                            <FieldArray
                                name="shifts"
                                component={ShiftsList}
                                onDelete={onDeleteShift}
                                onUpdate={this.onUpdateShift}
                                onCreate={onCreateShift}
                                showNames={true}
                                mode={mode}
                                shouldDisplayNoData={true}
                            />
                        </div>

                    </CardContent>
                </div>
                }
                {(mode === ReportModes.Live) &&
                <div>
                    <CardHeader title="מצב משמרת"/>

                    <CardContent className="card-content">
                        <div id="live-report">
                            <div className="live-time" style={{color: primary}}>{calculateCurrentTime()}</div>
                            <div className="live-date" style={{color: secondary}}>{calculateCurrentDay("DD/MM/YYYY")}</div>

                            <div className="auto-complete">
                                <AutoComplete
                                    placeholder="הכנס עובד למשמרת"
                                    suggestions={employees && employees.map(employee => ({
                                            ...employee,
                                            label: employee.firstName
                                        })
                                    )}
                                    onSelect={this.onClockIn}
                                />
                            </div>

                            <FieldArray
                                name="shifts"
                                component={ShiftsList}
                                onDelete={onDeleteShift}
                                onUpdate={this.onUpdateShift}
                                onCreate={onCreateShift}
                                showNames={true}
                                mode={mode}
                                shouldDisplayNoData={false}
                            />
                        </div>

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
    mode: PropTypes.number.isRequired,
    theme: PropTypes.object
};

export default CSSModules(withTheme()(DailyReport), styles);

