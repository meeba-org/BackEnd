import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import React, {Component} from 'react';
import FieldArray from "redux-form/es/FieldArray";
import {DATE_FORMAT} from "../../helpers/utils";
import Divider from "@material-ui/core/Divider";
import moment from "./DailyReport";
import ShiftsList from "./ShiftsList";
import CSSModules from "react-css-modules";
import styles from '../../styles/DailyReport.scss';

class PendingReport extends Component {
    state = {

    };

    onUpdateShift = (shift) => {
        let value = moment(this.state.currentDay, DATE_FORMAT);
        this.props.onUpdateShift(shift, value.format('MM'), value.format('YYYY'));
    };

    render() {
        const {showShiftDialog, onDeleteShift, showLocationModal, mode} = this.props;

        return (
            <Card>
                <CardHeader title="משמרות ממתינות לאישור"/>

                <CardContent className={styles["card-content"]}>

                    <div className={styles["daily-report"]}>
                        <Divider className={styles["divider"]}/>

                        <FieldArray
                            name="shifts"
                            component={ShiftsList}
                            onDelete={onDeleteShift}
                            onUpdate={this.onUpdateShift}
                            showShiftDialog={showShiftDialog}
                            showLocationModal={showLocationModal}
                            showNames={true}
                            mode={mode}
                            shouldDisplayNoData={true}
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
