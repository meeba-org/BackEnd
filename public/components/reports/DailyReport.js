import withTheme from '@material-ui/core/styles/withTheme';
import Tooltip from "@material-ui/core/Tooltip";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Warning from "@material-ui/icons/Warning";
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import PropTypes from 'prop-types';
import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import {calculateCurrentDay, calculateCurrentTime, createShiftForClockIn, DATE_FORMAT, ReportModes} from "../../helpers/utils";
import '../../styles/DailyReport.scss';
import AddShiftsDialog from "../AddShiftsDialog";
import AutoComplete from "../AutoComplete";
import MbActionButton from "../MbActionButton";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import ShiftsList from "./ShiftsList";

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

    onNextDay = () => {
        const {currentDay} = this.state;

        const nextDay = moment(currentDay).add(1, 'days');
        this.handleChange(nextDay);
    };

    onPrevDay = () => {
        const {currentDay} = this.state;

        const prevDay = moment(currentDay).subtract(1, 'days');
        this.handleChange(prevDay);
    };

    handleChange(date) {
        let currentDay = date.format(DATE_FORMAT);

        this.setState({currentDay});
        this.props.onDayChange(currentDay);
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    onClockIn = (employee) => {
        let shift = createShiftForClockIn(employee);
        this.props.onCreateShift(shift);
    };

    onUpdateShift = (shift) => {
        let value = moment(this.state.currentDay, DATE_FORMAT);
        this.props.onUpdateShift(shift, value.format('MM'), value.format('YYYY'));
    };

    hasEmployees = (employees) => {
        return employees && employees.length > 0;
    };

    navigateToEmployees = () => {
        this.props.history.push('/dashboard/employees');
    };

    render() {
        const {shifts, onCreateShift, onDeleteShift, showShiftDialog, employees, mode, isLoading} = this.props;
        let {currentDay} = this.state;
        let {primary, secondary} = this.props.theme.palette.text;

        return (
            <Fragment>
                {(mode === ReportModes.Report) &&
                <Fragment>
                    <MbCard title="דוח יומי">

                        <div styleName="daily-report">
                            <MbActionsControls>
                                <DatePicker autoOk onChange={(date) => this.handleChange(date)} value={currentDay}
                                            format="DD/MM/YYYY"
                                            styleName="date"
                                            inputProps={{style: {textAlign: "center"}}}
                                />

                                <MbActionButton
                                    onClick={this.onPrevDay}
                                    iconComponent={NavigateNext}
                                    tooltip="יום אחורה"
                                />

                                <MbActionButton
                                    onClick={this.onNextDay}
                                    iconComponent={NavigateBefore}
                                    tooltip="יום קדימה"
                                    disabled={moment(currentDay).isSame(new Date(), "day")}
                                />

                                <Tooltip title="הוספת משמרת" placement="top">
                                    <MbActionButton
                                        onClick={this.handleClickOpen}
                                        iconComponent={AddIcon}
                                    />
                                </Tooltip>
                                <AddShiftsDialog
                                    open={this.state.open}
                                    onCreate={onCreateShift}
                                    onCancel={() => this.handleRequestClose()}
                                    employees={employees}
                                    defaultStartDate={currentDay}
                                />
                            </MbActionsControls>

                            <ShiftsList
                                shifts={shifts}
                                onDelete={onDeleteShift}
                                onUpdate={this.onUpdateShift}
                                showShiftDialog={showShiftDialog}
                                showNames={true}
                                mode={mode}
                                shouldDisplayNoData={true}
                            />
                        </div>
                    </MbCard>
                </Fragment>
                }
                {(mode === ReportModes.Live) &&
                <Fragment>
                    <MbCard title="מצב משמרת">

                        <div styleName="live-report">
                            <div styleName="live-time" style={{color: primary}}>{calculateCurrentTime()}</div>
                            <div styleName="live-date" style={{color: secondary}}>{calculateCurrentDay("DD/MM/YYYY")}</div>

                            <div styleName="auto-complete">
                                <AutoComplete
                                    placeholder="הכנס עובד למשמרת"
                                    suggestions={employees && employees.map(employee => ({
                                            ...employee,
                                            label: employee.fullName
                                        })
                                    )}
                                    onSelect={this.onClockIn}
                                    disabled={!isLoading && !this.hasEmployees(employees)}
                                />

                                {!isLoading && !this.hasEmployees(employees) &&
                                <div styleName="warning">
                                    <Warning styleName="icon"/>
                                    <span>
                                    עדיין לא הזנו עובדים. <a href="#" onClick={this.navigateToEmployees}>בוא נעשה זאת עכשיו!</a>
                                    </span>
                                </div>
                                }
                            </div>

                            <ShiftsList
                                shifts={shifts}
                                onDelete={onDeleteShift}
                                onUpdate={this.onUpdateShift}
                                showShiftDialog={showShiftDialog}
                                showNames={true}
                                mode={mode}
                                shouldDisplayNoData={false}
                                postUpdate={() => this.props.onDayChange(this.state.currentDay)}
                            />
                        </div>

                    </MbCard>
                </Fragment>
                }
            </Fragment>
        );
    }
}

DailyReport.propTypes = {
    shifts: PropTypes.array,
    employees: PropTypes.array,
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
    showShiftDialog: PropTypes.func.isRequired,
    onDayChange: PropTypes.func.isRequired,
    mode: PropTypes.number.isRequired,
    theme: PropTypes.object,
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default withRouter(withTheme(DailyReport));

