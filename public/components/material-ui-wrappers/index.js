import React from 'react';
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';

export const renderTextField = ({input, label, type, fullWidth, autoFocus, autoComplete, testId}) => (
    <TextField
        placeholder={label}
        label={label}
        type={type}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        data-testid={testId}
        {...input}
        />
);

renderTextField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    styleName: PropTypes.string,
    autoComplete: PropTypes.string,
    fullWidth: PropTypes.bool,
    autoFocus: PropTypes.bool,
};
