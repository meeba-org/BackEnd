import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import '../../styles/User.scss';
import ExportContainer from "../export/ExportContainer";
import MbCard from "../MbCard";
import NoData from "../NoData";
import StartOfMonthField from "./StartOfMonthField";

class User extends Component {
    handleUserChange = (key, e) => {
        const {onUpdateUser, user} = this.props;
        const value = e.target.value;

        let newUser = {
            ...user,
            [key]: value
        };

        onUpdateUser(newUser);
    };

    handleCompanyChange = (field, e) => {
        const {onUpdateCompany} = this.props;
        const value = e.target.value;

        let user = {
            ...user,
        };

        user.company = {
            ...user.company,
            [field]: value
        };

        onUpdateCompany(user.company);
    };

    handleCompanySettingsChange = (field, value) => {
        const {onUpdateCompany} = this.props;

        let user = {
            ...user,
            company: {
                ...user.company,
                settings: {
                    ...user.company.settings,
                    [field]: value
                }
            },
        };

        onUpdateCompany(user.company);
    };

    SettingSwitch = ({value, fieldValue, text, link}) => {
        return (
            <div styleName="row">
                <FormControlLabel
                    control={
                        <Switch
                            style={{height: "initial"}}
                            checked={value}
                            onChange={(e) => {
                                this.handleCompanySettingsChange(fieldValue, e.target.checked);
                            }}
                            value={value}
                            color="primary"
                        />
                    }
                    label={<Typography variant={"body2"}>{text}</Typography>}
                />
                {link &&
                <Typography variant={"caption"}>
                    <Link to={link}  target="_blank">מה זה?</Link>
                </Typography>
                }
            </div>
        );
    }

    render() {
        const {hasPremiumFeature, onFreePlanClick, onPremiumPlanClick, user} = this.props;

        if (!user || !user.company)
            return <NoData/>;

        return (
            <div styleName="user-container">
                <MbCard title={"פרטי מנהל"}>
                    <Grid container>
                        <Grid item sm={12}>
                            <TextField
                                styleName="long-field"
                                id="fullName"
                                label="שם מלא"
                                value={user.fullName}
                                onChange={(e) => this.handleUserChange("fullName", e)}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Tooltip
                                title="אנחנו מכבדים את הפרטיות שלך - האימייל מאפשר לך לאפס את הסיסמא במידת בצורך">
                                <TextField
                                    styleName="long-field"
                                    id="email"
                                    label="אימייל"
                                    value={user.email}
                                    onChange={(e) => this.handleUserChange("email", e)}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </MbCard>

                <MbCard title={"חברה"}>
                    <Grid container>
                        <Grid item sm={12}>
                            <TextField
                                id="company-name"
                                label="שם"
                                value={user.company.name}
                                onChange={(e) => this.handleCompanyChange("name", e)}
                                styleName="long-field"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Tooltip
                                title="אנחנו מכבדים את הפרטיות שלך - אימייל חברה נועד למטרת שליחת חשבונית במידת הצורך">
                                <TextField
                                    styleName="long-field"
                                    label="דואר אלקטרוני"
                                    type="email"
                                    value={user.company.email}
                                    onChange={(e) => this.handleCompanyChange("email", e)}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </MbCard>

                <ExportContainer />

                <MbCard title={"מתקדם"}>
                    <div styleName="settings">
                        <div styleName="row hours">
                            <TextField
                                id="holiday-start"
                                label="כניסת שבת/חג"
                                value={user.company.settings.eveningHolidayStartHour}
                                onChange={(e) => this.handleCompanySettingsChange("eveningHolidayStartHour", e.target.value)}
                                styleName="short-field hour"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">00:</InputAdornment>
                                }}
                            />

                            <TextField
                                id="holiday-end"
                                label="יציאת שבת/חג"
                                value={user.company.settings.holidayEndHour}
                                onChange={(e) => this.handleCompanySettingsChange("holidayEndHour", e.target.value)}
                                styleName="short-field hour"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">00:</InputAdornment>
                                }}
                            />
                        </div>
                        <div styleName="row hours">
                            <TextField
                                id="holiday-shift-length"
                                label="אורך משמרת בשבת/חג"
                                value={user.company.settings.holidayShiftLength}
                                onChange={(e) => this.handleCompanySettingsChange("holidayShiftLength", e.target.value)}
                                styleName="short-field hour"
                                inputProps={{"style": {textAlign: "center"}}}
                            />

                            <TextField
                                id="regular-shift-length"
                                label="אורך משמרת רגילה"
                                value={user.company.settings.regularShiftLength}
                                onChange={(e) => this.handleCompanySettingsChange("regularShiftLength", e.target.value)}
                                styleName="short-field hour"
                                inputProps={{"style": {textAlign: "center"}}}
                            />

                        </div>

                        <div styleName="row">
                            <TextField
                                id="standard-required"
                                label="אורך הפסקה (דק')"
                                value={user.company.settings.breakLength}
                                onChange={(e) => this.handleCompanySettingsChange("breakLength", e.target.value)}
                            />

                            <Typography variant={"caption"}>
                                <Link to="/faq/break"  target="_blank">מה זה?</Link>
                            </Typography>
                        </div>

                        <div styleName="row">
                            <StartOfMonthField
                                value={user.company.settings.startOfMonth}
                                onChange={value => this.handleCompanySettingsChange("startOfMonth", value)}
                            />
                        </div>

                        <this.SettingSwitch text={"הזנת החזר נסיעות ע\"י העובד"} value={user.company.settings.enableCommute}
                                       fieldValue={"enableCommute"} link={"/faq/commute"} />

                        <this.SettingSwitch text={"ימי היעדרות (חופש, מחלה, מילואים)"} value={user.company.settings.enableAbsenceDays}
                                       fieldValue={"enableAbsenceDays"} link={"/faq/absenceDays"} />

                        <this.SettingSwitch text={"משימות"} value={user.company.settings.enableTasks}
                                       fieldValue={"enableTasks"} link={"/faq/tasks"} />

                    </div>
                </MbCard>

                <MbCard title={"תוכנית"}>
                    <div styleName="plan">
                        {hasPremiumFeature &&
                        <Fragment>
                            <div styleName="text">הינך כרגע מנוי בתוכנית פרימיום</div>
                            <Button onClick={() => onPremiumPlanClick(user.company)} variant="outlined" color="secondary">
                                סיים מנוי
                            </Button>
                        </Fragment>
                        }
                        {!hasPremiumFeature &&
                        <Fragment>
                            <div styleName="text">הינך כרגע במסלול החינמי</div>
                            <Button onClick={onFreePlanClick} variant="contained" color="secondary">הירשם כמנוי</Button>
                        </Fragment>
                        }
                    </div>
                </MbCard>
            </div>
        );
    }
}

User.propTypes = {
    onUpdateUser: PropTypes.func.isRequired,
    onUpdateCompany: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    hasPremiumFeature: PropTypes.bool
};

export default User;

