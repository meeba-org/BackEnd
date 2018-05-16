import React from 'react';
import {TextField} from "@material-ui/core";
import PropTypes from 'prop-types';

export const renderTextField = ({input, label, type, fullWidth, autoFocus, className}) => (
    <TextField
        placeholder={label}
        label={label}
        type={type}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        className={className}
        {...input}
        />
);

renderTextField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    autoFocus: PropTypes.bool,
};
