import {IconButton, TextField} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import Warning from "@material-ui/icons/Warning";
import {Autocomplete} from "@material-ui/lab";
import React, {useState} from "react";
import withTheme from '@material-ui/core/styles/withTheme';
import {calculateCurrentDay, calculateCurrentTime} from "../../helpers/utils";
import MbCard from "../MbCard";
import ShiftsList from "./ShiftsList";
import './styles/LiveDailyReport.scss';

const LiveDailyReport = ({theme, employees, hasEmployees, loading, mode, onClick, onDelete, onSelect, onUpdate, postUpdate, shifts, onRefresh}) => {
    let {primary, secondary} = theme.palette.text;
    const [keyToClearInput, setKeyToClearInput] = useState(false);

    return (
        <MbCard title="מצב משמרת">
            <div styleName="live-report">
                <div styleName="live-time" style={{color: primary}}>{calculateCurrentTime()}</div>
                <div styleName="live-date" style={{color: secondary}}>{calculateCurrentDay("DD/MM/YYYY")}</div>

                <div styleName="auto-complete">
                    <IconButton styleName="refresh" color="primary" onClick={onRefresh}>
                        <RefreshIcon />
                    </IconButton>
                    <Autocomplete
                        options={employees}
                        getOptionLabel={(employee) => employee.fullName}
                        style={{ width: 300 }}
                        disableClearable
                        key={keyToClearInput}
                        renderInput={(params) => <TextField {...params} label="הכנס עובד למשמרת" />}
                        onChange={(event, value) => {
                            onSelect(value);
                            setKeyToClearInput(!keyToClearInput);
                        }}
                    />
                </div>

                {!loading && !hasEmployees &&
                <div styleName="warning">
                    <Warning styleName="icon"/>
                    <span>
                        עדיין לא הזנו עובדים. <a href="#" onClick={onClick}>בוא נעשה זאת עכשיו!</a>
                        </span>
                </div>
                }

                <ShiftsList
                    shifts={shifts}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    showNames={true}
                    mode={mode}
                    shouldDisplayNoData={false}
                    postUpdate={postUpdate}
                />
            </div>
        </MbCard>
    );
};

export default withTheme(LiveDailyReport);
