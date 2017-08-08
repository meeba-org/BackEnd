import React from 'react';
import PropTypes from 'prop-types';
import {Field} from "redux-form";


let InputComponent = props => {
    return (
        <input  type={props.type} {...props.input} value={props.inputValue} className={props.className} />
    )
}

let TextInput = (props) => {
    console.log("value: " + props.inputValue);
    return (
        <div>
            <Field name={props.name} component={InputComponent} type="text" {...props}/>
        </div>
    );
};

TextInput.propTypes = {
    className: PropTypes.string,
    inputValue: PropTypes.string,
};

export default TextInput;
