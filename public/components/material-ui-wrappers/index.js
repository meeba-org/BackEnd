import React from 'react';
import {TextField} from "material-ui";
import PropTypes from 'prop-types';

export const renderTextField = ({input, label, type}) => (
    <TextField
        placeholder={label}
        label={label}
        type={type}
        {...input}
        />
);

renderTextField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
};
