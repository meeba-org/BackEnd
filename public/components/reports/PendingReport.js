import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import FieldArray from "redux-form/es/FieldArray";
import {DATE_FORMAT, ReportModes} from "../../helpers/utils";
import styles from '../../styles/DailyReport.scss';
import moment from "./DailyReport";
import ShiftsList from "./ShiftsList";

class PendingReport extends Component {
    state = {

    };

    onUpdateShift = (shift) => {
        let value = moment(this.state.currentDay, DATE_FORMAT);
        this.props.onUpdateShift(shift, value.format('MM'), value.format('YYYY'));
    };

    render() {
        const {showShiftDialog, onDeleteShift, postUpdate, onRefresh} = this.props;

        return (
            <Card>
                <CardHeader title="משמרות ממתינות לאישור"/>

                <CardContent className={styles["card-content"]}>

                    <div className={styles["daily-report"]}>
                        <div className={styles["controls-line"]}>
                            <Tooltip title="רענן" placement="top">
                                <Button className={styles["action-button"]} variant="contained" color="primary"
                                        onClick={onRefresh}><RefreshIcon/></Button>
                            </Tooltip>
                        </div>

                        <Divider className={styles["divider"]}/>

                        <FieldArray
                            name="shifts"
                            component={ShiftsList}
                            onDelete={onDeleteShift}
                            onUpdate={this.onUpdateShift}
                            showShiftDialog={showShiftDialog}
                            showNames={true}
                            mode={ReportModes.Report}
                            shouldDisplayNoData={true}
                            postUpdate={postUpdate}
                        />
                    </div>

                </CardContent>
            </Card>
        );
    }
}

PendingReport.propTypes = {};
PendingReport.defaultProps = {};

export default CSSModules(PendingReport, styles);
