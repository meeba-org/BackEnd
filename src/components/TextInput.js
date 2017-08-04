import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "redux-form";

class TextInput extends Component {
    render() {
        let {className, text, name} = this.props;
        console.log("value: " + text);

        return (
            <Field name={name} component="input" type="text" className={className} value={text} />
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
};

export default TextInput;
