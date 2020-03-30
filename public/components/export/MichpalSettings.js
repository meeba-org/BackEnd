import {TextField} from "@material-ui/core";
import React, {Fragment} from 'react';

const MichpalSettings = ({onChange, michpalSettings}) => {
    const handleChange = (e, key) => {
        const value = e.target.value;
        onChange(key, value);
    };

    return (
        <Fragment>
            <TextField label="קוד חברה" value={michpalSettings.michpalId} onChange={e => handleChange(e, "michpalId")} />
        </Fragment>
    );
};

export default MichpalSettings;
