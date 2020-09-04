import Warning from "@material-ui/icons/Warning";
import React from "react";
import withTheme from '@material-ui/core/styles/withTheme';
import {calculateCurrentDay, calculateCurrentTime} from "../../helpers/utils";
import AutoComplete from "../AutoComplete";
import MbCard from "../MbCard";
import ShiftsList from "./ShiftsList";
import './styles/LiveDailyReport.scss';

const LiveDailyReport = ({theme, employees, hasEmployees, loading, mode, onClick, onDelete, onSelect, onUpdate, postUpdate, shifts}) => {
    let {primary, secondary} = theme.palette.text;

    return (
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
                        onSelect={onSelect}
                        disabled={!loading && !hasEmployees}
                    />

                    {!loading && !hasEmployees &&
                    <div styleName="warning">
                        <Warning styleName="icon"/>
                        <span>
                        עדיין לא הזנו עובדים. <a href="#" onClick={onClick}>בוא נעשה זאת עכשיו!</a>
                        </span>
                    </div>
                    }
                </div>

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
