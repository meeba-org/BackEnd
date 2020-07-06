import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import '../../styles/User.scss';
import ExportContainer from "../export/ExportContainer";
import MbCard from "../MbCard";
import NoData from "../NoData";
import WhatIsIt from "../WhatIsIt";
import WorkplacesContainer from "./WorkplacesContainer";
import SettingSwitch from "./SettingSwitch";
import StartOfMonthField from "./StartOfMonthField";

const User = ({
                  hasPremiumFeature, onFreePlanClick, onPremiumPlanClick, user,
                  onCompanyChange, onUserChange, onCompanySettingsChange
              }) => {

    const onInnovativeAuthorityChange = (key, value) => {
        const settings = {
            ...user.company.settings,
            "enableAbsenceDays": value,
            "enableTasks": value,
            "enableInnovativeAuthority": value
        };

        onCompanyChange("settings", settings);
    };

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
                            onChange={(e) => onUserChange("fullName", e.target.value)}
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
                                error={!user.email}
                                onChange={(e) => onUserChange("email", e.target.value)}
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
                            onChange={(e) => onCompanyChange("name", e.target.value)}
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
                                onChange={(e) => onCompanyChange("email", e.target.value)}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </MbCard>

            <WorkplacesContainer/>

            <ExportContainer/>

            <MbCard title={"מתקדם"}>
                <div styleName="settings">
                    <div styleName="row hours">
                        <TextField
                            id="holiday-start"
                            label="כניסת שבת/חג"
                            value={user.company.settings.eveningHolidayStartHour}
                            onChange={(e) => onCompanySettingsChange("eveningHolidayStartHour", e.target.value)}
                            styleName="short-field hour"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">00:</InputAdornment>
                            }}
                        />

                        <TextField
                            id="holiday-end"
                            label="יציאת שבת/חג"
                            value={user.company.settings.holidayEndHour}
                            onChange={(e) => onCompanySettingsChange("holidayEndHour", e.target.value)}
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
                            onChange={(e) => onCompanySettingsChange("holidayShiftLength", e.target.value)}
                            styleName="short-field hour"
                            inputProps={{"style": {textAlign: "center"}}}
                        />

                        <TextField
                            id="regular-shift-length"
                            label="אורך משמרת רגילה"
                            value={user.company.settings.regularShiftLength}
                            onChange={(e) => onCompanySettingsChange("regularShiftLength", e.target.value)}
                            styleName="short-field hour"
                            inputProps={{"style": {textAlign: "center"}}}
                        />

                    </div>

                    <div styleName="row">
                        <TextField
                            id="standard-required"
                            label="אורך הפסקה (דק')"
                            value={user.company.settings.breakLength}
                            onChange={(e) => onCompanySettingsChange("breakLength", e.target.value)}
                        />

                        <WhatIsIt link={"/faq/break"}/>
                    </div>

                    <div styleName="row">
                        <StartOfMonthField
                            value={user.company.settings.startOfMonth}
                            onChange={value => onCompanySettingsChange("startOfMonth", value)}
                        />
                    </div>

                    <SettingSwitch text={"הזנת החזר נסיעות ע\"י העובד"} value={user.company.settings.enableCommute}
                                   fieldValue={"enableCommute"} link={"/faq/commute"}
                                   handleCompanySettingsChange={onCompanySettingsChange}
                    />

                    <SettingSwitch text={"ימי היעדרות (חופש, מחלה, מילואים)"}
                                   value={user.company.settings.enableAbsenceDays}
                                   fieldValue={"enableAbsenceDays"} link={"/faq/absenceDays"}
                                   handleCompanySettingsChange={onCompanySettingsChange}
                                   disabled={user.company.settings.enableInnovativeAuthority}
                    />

                    <SettingSwitch text={"משימות"} value={user.company.settings.enableTasks}
                                   fieldValue={"enableTasks"} link={"/faq/tasks"}
                                   handleCompanySettingsChange={onCompanySettingsChange}
                                   disabled={user.company.settings.enableInnovativeAuthority}
                    />

                    <SettingSwitch text={"מצב הרשות לחדשנות"} value={user.company.settings.enableInnovativeAuthority}
                                   fieldValue={"enableInnovativeAuthority"}
                                   handleCompanySettingsChange={onInnovativeAuthorityChange}
                    />

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
};

User.propTypes = {
    onUserChange: PropTypes.func.isRequired,
    onCompanyChange: PropTypes.func.isRequired,
    user: PropTypes.object,
    hasPremiumFeature: PropTypes.bool
};

export default User;

