import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
    render() {
        let {className, text, handleChange} = this.props;

        return (
            <input type="text" className={className} defaultValue={text} onChange={(e) => {handleChange(e)}} />
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    handleChange: PropTypes.func,
};

export default TextInput;
