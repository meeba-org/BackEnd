import {TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React, {Fragment} from 'react';

const MichpalSettings = ({onChange, michpalSettings}) => {
    const handleChange = (e, key) => {
        const value = e.target.value;
        onChange(key, value);
    };

    return (
        <Fragment>
            <Box display="flex" flexDirection="column" style={{width: "200px"}}>
                <TextField required label="קוד חברה" value={michpalSettings.michpalId || ""} onChange={e => handleChange(e, "michpalId")} />
                <TextField required label="קוד לתעריף 100%" value={michpalSettings.regularHoursCode || ""} onChange={e => handleChange(e, "regularHoursCode")} />
                <TextField label="קוד לתעריף 125%" value={michpalSettings.extra125HoursCode || ""} onChange={e => handleChange(e, "extra125HoursCode")} />
                <TextField label="קוד לתעריף 150%" value={michpalSettings.extra150HoursCode || ""} onChange={e => handleChange(e, "extra150HoursCode")} />
                <TextField label="קוד לתעריף 175%" value={michpalSettings.extra175HoursCode || ""} onChange={e => handleChange(e, "extra175HoursCode")} />
                <TextField label="קוד לתעריף 200%" value={michpalSettings.extra200HoursCode || ""} onChange={e => handleChange(e, "extra200HoursCode")} />
            </Box>
        </Fragment>
    );
};

export default MichpalSettings;
