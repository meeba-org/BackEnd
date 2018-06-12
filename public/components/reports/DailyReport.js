import React, {Fragment} from "react";
import {Button, Card, CardContent, CardHeader, Divider, Tooltip} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {FieldArray} from "redux-form";
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from '../../styles/DailyReport.scss';
import ShiftsList from "./ShiftsList";
import AddShiftsDialog from "../AddShiftsDialog";
import {
    calculateCurrentDay,
    calculateCurrentTime,
    createShiftForClockIn,
    DATE_FORMAT,
    ReportModes
} from "../../helpers/utils";
import AutoComplete from "../AutoComplete";
import moment from "moment/moment";
import {Warning} from "@material-ui/icons";
import {DatePicker} from "material-ui-pickers";
import {withStyles, withTheme} from '@material-ui/core/styles';

const styles1 = {
    root: {
        overflow: "visible"
    }
};

class DailyReport extends React.PureComponent {
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

    handleChange(date) {
        let currentDay = date.format("YYYY-MM-DD");

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

    hasEmployees = (employees) => {
        return employees && employees.length > 0;
    };

    navigateToEmployees = () => {
        this.props.router.push('/dashboard/employees');
    };

    render() {
        const {onCreateShift, onDeleteShift, employees, mode, isLoading, classes} = this.props;
        let {currentDay} = this.state;
        let {primary, secondary} = this.props.theme.palette.text;

        return (
            <Card classes={{root: classes.root}}>
                {(mode === ReportModes.Report) &&
                <Fragment>
                    <CardHeader title="דוח יומי"/>

                    <CardContent className={styles["card-content"]}>

                        <div className={styles["daily-report"]}>
                            <div className={styles["controls-line"]}>
                                <DatePicker autoOk onChange={(date) => this.handleChange(date)} value={currentDay}
                                            format="DD/MM/YYYY"
                                            style={{margin: "0 10px"}}
                                            disableFuture
                                />

                                <Tooltip title="הוספת משמרת" placement="top">
                                    <Button className={styles["action-button"]} variant="raised" color="primary"
                                        onClick={() => this.handleClickOpen()}><AddIcon/></Button>
                                </Tooltip>
                                <AddShiftsDialog
                                    open={this.state.open}
                                    onCreate={onCreateShift}
                                    onCancel={() => this.handleRequestClose()}
                                    employees={employees}
                                />
                            </div>

                            <Divider className={styles["divider"]}/>

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
                </Fragment>
                }
                {(mode === ReportModes.Live) &&
                <Fragment>
                    <CardHeader title="מצב משמרת"/>

                    <CardContent className={styles["card-content"]}>
                        <div className={styles["live-report"]}>
                            <div className={styles["live-time"]} style={{color: primary}}>{calculateCurrentTime()}</div>
                            <div className={styles["live-date"]} style={{color: secondary}}>{calculateCurrentDay("DD/MM/YYYY")}</div>

                            <div className={styles["auto-complete"]}>
                                <AutoComplete
                                    placeholder="הכנס עובד למשמרת"
                                    suggestions={employees && employees.map(employee => ({
                                            ...employee,
                                            label: employee.firstName
                                        })
                                    )}
                                    onSelect={this.onClockIn}
                                    disabled={!isLoading && !this.hasEmployees(employees)}
                                />

                                {!isLoading && !this.hasEmployees(employees) &&
                                <div className={styles["warning"]}>
                                    <Warning className={styles["icon"]}/>
                                    <span>
                                    עדיין לא הזנו עובדים. <a href="#" onClick={this.navigateToEmployees}>בוא נעשה זאת עכשיו!</a>
                                    </span>
                                </div>
                                }
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
                </Fragment>
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
    theme: PropTypes.object,
    router: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles1)(CSSModules(withTheme()(DailyReport), styles));

