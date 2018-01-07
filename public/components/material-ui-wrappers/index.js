import React from 'react';
import {TextField} from "material-ui";
import PropTypes from 'prop-types';

export const renderTextField = ({input, label, type, fullWidth, autoFocus}) => (
    <TextField
        placeholder={label}
        label={label}
        type={type}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        {...input}
        />
);

renderTextField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    fullWidth: PropTypes.bool,
    autoFocus: PropTypes.bool,
};
