import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EXCEL, MICHPAL} from "../../../models/EReportFormat";
import {updateCompany} from "../../actions";
import {getCompany} from "../../selectors";
import MbActionsControls from "../MbActionsControls";
import MbCard from "../MbCard";
import MichpalSettings from "./MichpalSettings";

const ExportContainer = () => {
    const company = useSelector(getCompany);

    if (!company)
        return null;

    const {settings: {michpalSettings, defaultExportFormat}} =  company;
    const dispatch = useDispatch();
    const [selectedFormat, setSelectedFormat] = useState(defaultExportFormat);

    const handleMichpalSettingsChange = (key, value) => {

        const company = {
            ...company,
            settings: {
                ...company.settings,
                michpalSettings: {
                    ...company.settings.michpalSettings,
                    [key]: value
                }
            }
        };

        dispatch(updateCompany(company));
    };

    const setDefaultExportFormat = () => {

    };

    return (
        <MbCard title="ייצוא">
            <MbActionsControls>
                <Select
                    value={selectedFormat}
                    onChange={e => setSelectedFormat(e.target.value)}
                >
                    <MenuItem value={EXCEL}>אקסל</MenuItem>
                    <MenuItem value={MICHPAL}>מיכפל</MenuItem>
                </Select>

                <Button color="primary" onClick={setDefaultExportFormat} disabled={defaultExportFormat === selectedFormat}>קבע כברירת מחדל</Button>
            </MbActionsControls>
            {selectedFormat === MICHPAL && <MichpalSettings onChange={handleMichpalSettingsChange} michpalSettings={michpalSettings}/>}
        </MbCard>
    );
};


export default ExportContainer;
