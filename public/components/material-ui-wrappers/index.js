import React from 'react';
import {TextField} from "material-ui";
import PropTypes from 'prop-types';

export const renderTextField = ({input, label, ...custom}) => (
    <TextField
        placeholder={label}
        label={label}
        {...input}
        {...custom}
    />
);

renderTextField.propTypes = {
    input: PropTypes.string,
    label: PropTypes.string
};
