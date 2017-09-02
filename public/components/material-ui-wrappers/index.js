import React from 'react';
import {TextField} from "material-ui";

export const renderTextField = ({input, label, ...custom}) => (
    <TextField
        placeholder={label}
        label={label}
        {...input}
        {...custom}
    />
);
