import React from 'react';
import {TextField} from "material-ui";
import PropTypes from 'prop-types';

export const renderTextField = ({input, label}) => (
    <TextField
        placeholder={label}
        label={label}
        {...input}
        />
);

renderTextField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string
};
