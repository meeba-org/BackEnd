import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EXCEL, MICHPAL} from "../../../models/EReportFormat";
import {updateCompany} from "../../actions";
import {getCompany} from "../../selectors";
import MbCard from "../MbCard";
import MichpalSettings from "./MichpalSettings";
import "../../styles/ExportContainer.scss";

const ExportContainer = () => {
    const company = useSelector(getCompany) || {};
    const dispatch = useDispatch();
    const {settings: {michpalSettings = {}, defaultExportFormat = EXCEL} = {}} =  company;
    const [selectedFormat, setSelectedFormat] = useState(defaultExportFormat);

    if (!company)
        return null;


    const handleMichpalSettingsChange = (key, value) => {

        const updatedCompany = {
            ...company,
            settings: {
                ...company.settings,
                michpalSettings: {
                    ...company.settings.michpalSettings,
                    [key]: value
                }
            }
        };

        dispatch(updateCompany(updatedCompany));
    };

    const setDefaultExportFormat = () => {
        const updatedCompany = {
            ...company,
            settings: {
                ...company.settings,
                defaultExportFormat: selectedFormat
            }
        };

        dispatch(updateCompany(updatedCompany));
    };

    return (
        <MbCard title="ייצוא">
            <Select styleName={"select"}
                value={selectedFormat}
                onChange={e => setSelectedFormat(e.target.value)}
            >
                <MenuItem value={EXCEL}>אקסל</MenuItem>
                <MenuItem value={MICHPAL}>מיכפל</MenuItem>
            </Select>

            <Button color="primary" onClick={setDefaultExportFormat} disabled={defaultExportFormat === selectedFormat}>קבע
                כברירת מחדל</Button>
            {selectedFormat === MICHPAL &&
            <MichpalSettings onChange={handleMichpalSettingsChange} michpalSettings={michpalSettings}/>}
        </MbCard>
    );
};


export default ExportContainer;
